/*
 * Mobile nav open/close state.
 *
 * The explorer's markup defaults to OPEN: its stylesheet hides the panel only
 * once a `collapsed` class is scripted on. So every freshly rendered page - a
 * full load, or the body micromorph patches in on navigation - arrives with the
 * menu showing. The plugin's own attempt to re-add the class is gated on
 * Element.checkVisibility(), which Safari only shipped in 17.4, so on older
 * Safari nothing ever does.
 *
 * The default is inverted instead: visibility comes from a `nav-open` class on
 * <html>, which micromorph never touches (it patches <body> only) and which a
 * full page load starts without. No timing or ordering decides what shows.
 *
 * Everything here avoids APIs that fail quietly on older WebKit, because the
 * hamburger's only content is an <svg> with <line> children, so a tap targets
 * an SVG element rather than the button:
 *
 *   - Element.closest is not reachable from SVG elements on older WebKit, so
 *     ancestors are walked by hand via parentNode.
 *   - SVG elements expose className as an SVGAnimatedString, not a string, so
 *     class tests read getAttribute("class") when needed.
 *   - classList.toggle(name, force) ignored its second argument on older
 *     Safari, which would invert state rather than set it, so add/remove are
 *     used explicitly.
 *
 * The stylesheet's inverted rules are gated on `js-nav`, set below. If this
 * script never runs the rules do not apply at all, so a failure here leaves the
 * plugin's own behaviour intact rather than a menu that cannot be opened.
 */
;(() => {
  "use strict"

  if (window.__mobileNavFix) return // the SPA re-adds head scripts on each nav
  window.__mobileNavFix = true

  const MOBILE = "(max-width: 800px)" // $mobile in quartz/styles/variables.scss
  const OPEN = "nav-open"

  const html = document.documentElement
  const isMobile = () => matchMedia(MOBILE).matches
  const isOpen = () => html.classList.contains(OPEN)

  const setClass = (el, name, on) => {
    if (on) el.classList.add(name)
    else el.classList.remove(name)
  }

  // Works for SVG elements too, whose className is not a string.
  function classString(el) {
    if (typeof el.className === "string") return el.className
    if (el.getAttribute) return el.getAttribute("class") || ""
    return ""
  }
  const hasClass = (el, name) => (" " + classString(el) + " ").indexOf(" " + name + " ") !== -1

  function ancestor(node, test) {
    for (let n = node; n && n.nodeType === 1; n = n.parentNode) {
      if (test(n)) return n
    }
    return null
  }

  function revealToggle() {
    const buttons = document.getElementsByClassName("mobile-explorer")
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("hide-until-loaded")
    }
  }

  // Bring the plugin's own state into line with ours.
  function apply() {
    if (!isMobile()) return
    const on = isOpen()
    setClass(html, "mobile-no-scroll", on)
    const explorers = document.getElementsByClassName("explorer")
    for (let i = 0; i < explorers.length; i++) {
      setClass(explorers[i], "collapsed", !on)
      explorers[i].setAttribute("aria-expanded", on ? "true" : "false")
    }
  }

  function setOpen(on) {
    setClass(html, OPEN, on)
    revealToggle()
    apply()
    setTimeout(apply, 0) // after the plugin's click handler has had its turn
  }

  document.addEventListener(
    "click",
    (e) => {
      try {
        const t = e.target
        if (!t) return
        if (ancestor(t, (el) => hasClass(el, "mobile-explorer"))) {
          setOpen(!isOpen()) // the hamburger
          return
        }
        const link = ancestor(t, (el) => el.tagName && el.tagName.toLowerCase() === "a")
        if (link && ancestor(link, (el) => hasClass(el, "explorer"))) {
          setOpen(false) // a destination was chosen
        }
      } catch (err) {
        /* never let this wedge the menu */
      }
    },
    true,
  )

  // Any navigation closes it. `render` is deliberately not listened for: it can
  // fire while the menu is legitimately open and would slam it shut.
  document.addEventListener("nav", () => setOpen(false))
  document.addEventListener("render", revealToggle)

  // Leaving the mobile layout hands control back to the desktop sidebar.
  addEventListener("resize", () => {
    if (isMobile()) return
    html.classList.remove(OPEN)
    html.classList.remove("mobile-no-scroll")
    const explorers = document.getElementsByClassName("explorer")
    for (let i = 0; i < explorers.length; i++) {
      explorers[i].classList.remove("collapsed")
    }
  })

  html.classList.add("js-nav") // arms the stylesheet's inverted rules
  setOpen(false)
})()
