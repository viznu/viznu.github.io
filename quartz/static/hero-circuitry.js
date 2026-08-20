/*
 * Mobile hero: the portrait disintegrates into circuitry as the page scrolls.
 *
 * The canvas sits behind the hero text. At rest it paints the portrait
 * unchanged. As the hero scrolls away, cells of the image erode — bottom-left
 * first — and each eroded cell becomes a particle that routes, Manhattan-style
 * like a PCB trace, onto a lattice of rails laid out alongside the name. The
 * rails and their vias fade up as the particles land.
 *
 * Desktop is untouched: the canvas host is display:none above the breakpoint.
 * Honours prefers-reduced-motion by leaving the portrait crisp and still.
 */
;(() => {
  "use strict"

  const MOBILE = "(max-width: 800px)"
  const PORTRAIT_SRC = "/assets/portrait-cutout.png"
  const PORTRAIT_AR = 520 / 694 // intrinsic aspect of the cutout
  const CELL = 4 // px: sampling grain of the disintegration
  const ERODE_SPAN = 0.34 // how much scroll one cell takes to fly home

  // Deterministic PRNG so the circuit is identical on every load.
  const rng = (seed) => () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
  const ease = (t) => 1 - Math.pow(1 - t, 3)
  const smooth = (v, a, b) => clamp01((v - a) / (b - a))

  let live = null

  class HeroCircuit {
    constructor(host) {
      this.host = host
      this.canvas = document.createElement("canvas")
      this.canvas.className = "hero-portrait-canvas"
      host.appendChild(this.canvas)
      host.classList.add("has-canvas") // hands the portrait over from CSS
      this.ctx = this.canvas.getContext("2d")
      this.p = -1
      this.frame = 0
      this.ready = false

      this.onScroll = () => this.schedule()
      this.onResize = () => {
        this.measure()
        this.p = -1
        this.schedule()
      }

      this.img = new Image()
      this.img.decoding = "async"
      this.img.onload = () => {
        this.measure()
        this.ready = true
        this.schedule()
      }
      this.img.src = PORTRAIT_SRC

      addEventListener("scroll", this.onScroll, { passive: true })
      addEventListener("resize", this.onResize)
    }

    destroy() {
      removeEventListener("scroll", this.onScroll)
      removeEventListener("resize", this.onResize)
      cancelAnimationFrame(this.frame)
      this.canvas.remove()
      this.host.classList.remove("has-canvas") // give the CSS portrait back
    }

    measure() {
      const rect = this.host.getBoundingClientRect()
      this.w = Math.max(1, Math.round(rect.width))
      this.h = Math.max(1, Math.round(rect.height))
      this.dpr = Math.min(devicePixelRatio || 1, 2)
      this.canvas.width = this.w * this.dpr
      this.canvas.height = this.h * this.dpr
      this.canvas.style.width = this.w + "px"
      this.canvas.style.height = this.h + "px"
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

      // Portrait box: centred across the top of the hero.
      this.ph = Math.min(130, this.h * 0.52) // 65% of the original 200px
      this.pw = this.ph * PORTRAIT_AR
      this.px = (this.w - this.pw) / 2
      this.py = 0

      // Where the name + tagline sit, in canvas coordinates: the board is
      // held back over this box so the type stays legible.
      const txt = this.host.parentElement.querySelector(".hero-text")
      if (txt) {
        const t = txt.getBoundingClientRect()
        this.keepout = {
          x: t.left - rect.left,
          y: t.top - rect.top,
          w: t.width,
          h: t.height,
        }
      } else {
        this.keepout = null
      }

      this.buildCircuit()
      this.sample()
    }

    // A lattice of horizontal rails with vertical risers, occupying the band
    // beside and below the portrait — where the name sits.
    buildCircuit() {
      const rand = rng(20260820)
      const top = this.py + this.ph * 0.52
      const bottom = this.h - 4
      const step = 22
      const rails = []
      for (let y = top; y <= bottom; y += step) {
        const leftEdge = rand() < 0.5 ? 6 : this.w * (0.05 + rand() * 0.12)
        const rightEdge = this.w - (rand() < 0.5 ? 6 : this.w * (0.05 + rand() * 0.12))
        rails.push({ y: Math.round(y) + 0.5, x0: leftEdge, x1: rightEdge })
      }
      this.rails = rails

      // Vias: junction pads dotted along the rails.
      const vias = []
      for (const r of rails) {
        const n = 2 + Math.floor(rand() * 3)
        for (let i = 0; i < n; i++) {
          vias.push({ x: r.x0 + (r.x1 - r.x0) * rand(), y: r.y })
        }
      }
      this.vias = vias

      // Risers: short vertical links between neighbouring rails.
      const risers = []
      for (let i = 0; i < rails.length - 1; i++) {
        const n = 1 + Math.floor(rand() * 2)
        for (let k = 0; k < n; k++) {
          const a = rails[i]
          const b = rails[i + 1]
          const x = Math.round(Math.max(a.x0, b.x0) + (Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) * rand()) + 0.5
          risers.push({ x, y0: a.y, y1: b.y })
        }
      }
      this.risers = risers
    }

    // Read the portrait into cells, and give each one an erosion threshold and
    // a landing site on the circuit.
    sample() {
      const off = document.createElement("canvas")
      const cw = Math.max(1, Math.round(this.pw))
      const ch = Math.max(1, Math.round(this.ph))
      off.width = cw
      off.height = ch
      const octx = off.getContext("2d", { willReadFrequently: true })
      octx.drawImage(this.img, 0, 0, cw, ch)
      let data
      try {
        data = octx.getImageData(0, 0, cw, ch).data
      } catch (e) {
        this.cells = []
        return
      }

      const rand = rng(991)
      const cells = []
      for (let y = 0; y < ch; y += CELL) {
        for (let x = 0; x < cw; x += CELL) {
          const i = ((y + (CELL >> 1)) * cw + (x + (CELL >> 1))) * 4
          const a = data[i + 3]
          if (a < 24) continue
          const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
          // Erode from the bottom-left upward, with grain.
          const thr = clamp01(0.06 + 0.4 * (1 - y / ch) + 0.18 * (x / cw) + 0.2 * rand()) * 0.78
          const rail = this.rails[Math.floor(rand() * this.rails.length)] || { y: this.h, x0: 0, x1: this.w }
          cells.push({
            sx: this.px + x,
            sy: this.py + y,
            tx: rail.x0 + (rail.x1 - rail.x0) * rand(),
            ty: rail.y,
            thr,
            lum,
            elbowFirstVertical: rand() < 0.5,
          })
        }
      }
      this.cells = cells
    }

    // Keyed to the first screenful of scroll, not to the hero's full height:
    // the portrait has to still be on screen while it comes apart.
    progress() {
      return clamp01((scrollY || document.documentElement.scrollTop || 0) / 200)
    }

    schedule() {
      if (!this.ready) return
      cancelAnimationFrame(this.frame)
      this.frame = requestAnimationFrame(() => this.draw())
    }

    draw() {
      const p = this.progress()
      if (Math.abs(p - this.p) < 0.002) return
      this.p = p

      const ctx = this.ctx
      const cs = getComputedStyle(document.documentElement)
      const ink = cs.getPropertyValue("--darkgray").trim() || "#3d3d3d"
      const faint = cs.getPropertyValue("--gray").trim() || "#9e9e9e"

      ctx.clearRect(0, 0, this.w, this.h)

      // The photo, with eroded cells punched out of it.
      ctx.save()
      ctx.globalAlpha = 1
      ctx.drawImage(this.img, this.px, this.py, this.pw, this.ph)
      ctx.globalCompositeOperation = "destination-out"
      // melt the torso into the page, as the sidebar avatar does
      const fade = ctx.createLinearGradient(0, this.py + this.ph * 0.72, 0, this.py + this.ph)
      fade.addColorStop(0, "rgba(0,0,0,0)")
      fade.addColorStop(1, "rgba(0,0,0,1)")
      ctx.fillStyle = fade
      ctx.fillRect(this.px, this.py + this.ph * 0.72, this.pw, this.ph * 0.28)
      ctx.fillStyle = "#000"
      for (const c of this.cells) {
        if (p > c.thr) ctx.fillRect(c.sx - 0.5, c.sy - 0.5, CELL + 1, CELL + 1)
      }
      ctx.restore()

      // Rails, risers and vias fading up as the particles arrive.
      const boardAlpha = smooth(p, 0.18, 0.8)
      if (boardAlpha > 0) {
        ctx.save()
        const grow = ease(clamp01((p - 0.18) / 0.5))
        ctx.globalAlpha = boardAlpha * 0.85
        ctx.strokeStyle = ink
        ctx.lineWidth = 1
        ctx.lineJoin = "round"
        ctx.beginPath()
        for (const r of this.rails) {
          const mid = (r.x0 + r.x1) / 2
          const half = ((r.x1 - r.x0) / 2) * grow
          const ch = 6 // 45-degree chamfer at each end, the PCB tell
          ctx.moveTo(mid - half + ch, r.y - ch)
          ctx.lineTo(mid - half, r.y)
          ctx.lineTo(mid + half, r.y)
          ctx.lineTo(mid + half - ch, r.y + ch)
        }
        for (const v of this.risers) {
          const y1 = v.y0 + (v.y1 - v.y0) * grow
          ctx.moveTo(v.x, v.y0)
          ctx.lineTo(v.x, y1)
        }
        ctx.stroke()
        // vias: rings, not blobs
        ctx.globalAlpha = boardAlpha
        ctx.lineWidth = 1
        for (const v of this.vias) {
          ctx.beginPath()
          ctx.arc(v.x, v.y, 2.1 * grow, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
      }

      // Particles: each eroded cell routes to its landing site with one elbow.
      ctx.save()
      ctx.fillStyle = ink
      for (const c of this.cells) {
        if (p <= c.thr) continue
        const lp = ease(clamp01((p - c.thr) / ERODE_SPAN))
        let x, y
        if (c.elbowFirstVertical) {
          if (lp < 0.5) {
            x = c.sx
            y = c.sy + (c.ty - c.sy) * (lp / 0.5)
          } else {
            x = c.sx + (c.tx - c.sx) * ((lp - 0.5) / 0.5)
            y = c.ty
          }
        } else {
          if (lp < 0.5) {
            x = c.sx + (c.tx - c.sx) * (lp / 0.5)
            y = c.sy
          } else {
            x = c.tx
            y = c.sy + (c.ty - c.sy) * ((lp - 0.5) / 0.5)
          }
        }
        ctx.globalAlpha = (0.18 + 0.82 * (1 - c.lum)) * (1 - 0.15 * lp)
        const s = CELL - 1.2 * lp
        ctx.fillRect(x, y, s > 1.2 ? s : 1.2, s > 1.2 ? s : 1.2)
      }
      ctx.restore()

      // Hold the board back over the name and tagline — a soft elliptical
      // keep-out, so the type reads cleanly instead of being crosshatched.
      const k = this.keepout
      if (k) {
        const cx = k.x + k.w / 2
        const cy = k.y + k.h / 2
        const rx = k.w * 0.62
        const ry = k.h * 0.72
        ctx.save()
        ctx.globalCompositeOperation = "destination-out"
        ctx.translate(cx, cy)
        ctx.scale(rx / ry, 1)
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ry)
        g.addColorStop(0, "rgba(0,0,0,0.92)")
        g.addColorStop(0.55, "rgba(0,0,0,0.82)")
        g.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(0, 0, ry, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }
  }

  function init() {
    if (live) {
      live.destroy()
      live = null
    }
    const host = document.querySelector(".hero-portrait")
    if (!host) return
    if (!matchMedia(MOBILE).matches) return
    // Reduced motion keeps the CSS-painted portrait, still and crisp.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    live = new HeroCircuit(host)
  }

  if (document.readyState !== "loading") init()
  else document.addEventListener("DOMContentLoaded", init)
  document.addEventListener("nav", init)
  addEventListener("resize", () => {
    const on = matchMedia(MOBILE).matches
    if (on && !live) init()
    if (!on && live) {
      live.destroy()
      live = null
    }
  })
})()
