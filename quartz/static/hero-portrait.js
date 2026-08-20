/*
 * Mobile hero: the portrait dissolves as the page scrolls.
 *
 * The canvas sits behind the hero text and paints the portrait unchanged at
 * rest. As the hero scrolls away the image dissolves cell by cell: each cell
 * fades out where it sits, in a grain order that runs bottom-left first.
 * Nothing moves, and nothing is drawn that was not already part of the photo.
 *
 * Desktop is untouched: the canvas host is display:none above the breakpoint.
 * With no JS, a failed load, or prefers-reduced-motion, the CSS-painted
 * portrait stays put and this never runs.
 */
;(() => {
  "use strict"

  const MOBILE = "(max-width: 800px)"
  const PORTRAIT_SRC = "/assets/portrait-cutout.png"
  const PORTRAIT_AR = 520 / 694 // intrinsic aspect of the cutout
  const CELL = 4 // px: grain of the dissolve
  const FADE_SPAN = 0.22 // fraction of the scroll one cell takes to fade out
  const SCROLL_SPAN = 200 // px of scroll over which the whole dissolve plays

  // Deterministic PRNG so the grain is identical on every load.
  const rng = (seed) => () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

  let live = null

  class HeroDissolve {
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
      this.ph = Math.min(130, this.h * 0.52)
      this.pw = this.ph * PORTRAIT_AR
      this.px = (this.w - this.pw) / 2
      this.py = 0

      this.sample()
    }

    // One cell per CELL x CELL block of the portrait, each with the scroll
    // position at which it starts to fade. Transparent blocks are skipped.
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
          if (data[i + 3] < 24) continue
          // Mostly noise, with a gentle bottom-left-first bias, so it reads as
          // a dissolve rather than a wipe.
          const thr = clamp01(0.52 * rand() + 0.3 * (1 - y / ch) + 0.14 * (x / cw)) * 0.78
          cells.push({ x: this.px + x, y: this.py + y, thr })
        }
      }
      this.cells = cells
    }

    progress() {
      return clamp01((scrollY || document.documentElement.scrollTop || 0) / SCROLL_SPAN)
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
      ctx.clearRect(0, 0, this.w, this.h)

      ctx.save()
      ctx.drawImage(this.img, this.px, this.py, this.pw, this.ph)
      ctx.globalCompositeOperation = "destination-out"

      // Melt the torso into the page, as the sidebar avatar does.
      const fade = ctx.createLinearGradient(0, this.py + this.ph * 0.72, 0, this.py + this.ph)
      fade.addColorStop(0, "rgba(0,0,0,0)")
      fade.addColorStop(1, "rgba(0,0,0,1)")
      ctx.fillStyle = fade
      ctx.fillRect(this.px, this.py + this.ph * 0.72, this.pw, this.ph * 0.28)

      // Each cell fades out in place: erase it in proportion to its own local
      // progress, so it thins out where it sits rather than going anywhere.
      ctx.fillStyle = "#000"
      for (const c of this.cells) {
        const lp = clamp01((p - c.thr) / FADE_SPAN)
        if (lp <= 0) continue
        ctx.globalAlpha = lp
        ctx.fillRect(c.x - 0.5, c.y - 0.5, CELL + 1, CELL + 1)
      }
      ctx.restore()
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
    live = new HeroDissolve(host)
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
