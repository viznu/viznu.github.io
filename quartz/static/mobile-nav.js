/*
 * Close the mobile nav after navigating.
 *
 * Three things conspire to leave it open:
 *
 *  1. The explorer plugin collapses itself on `nav`, but gates that on
 *     Element.checkVisibility(), which Safari only shipped in 17.4. On older
 *     Safari the guard is falsy, so it never collapses - and the menu even
 *     comes up open on first load, leaving the toggle inverted.
 *  2. The SPA swaps the body with micromorph, and the incoming markup carries
 *     no `collapsed` class, so a menu closed before navigating is patched back
 *     open the moment the new page lands.
 *  3. The toggle button starts out `hide-until-loaded` (display:none) until the
 *     plugin marks the tree ready, so its computed display cannot be used to
 *     detect the mobile layout during early startup. The breakpoint media query
 *     is checked instead - it matches $mobile in the Quartz stylesheet.
 *
 * Closing once on click is therefore not enough; the close is re-asserted over
 * the following half second so it survives the body swap and any late tree
 * render. It is also deliberately *not* bound to `render`, and skips `nav`
 * events that do not change the path, so a late re-render can never slam shut
 * a menu the user has just opened - which on a slow connection is exactly what
 * a naive version does.
 */
;(() => {
  "use strict"

  if (window.__mobileNavFix) return // the SPA re-adds head scripts on each nav
  window.__mobileNavFix = true

  const MOBILE = "(max-width: 800px)" // $mobile in quartz/styles/variables.scss
  const REASSERT_MS = [0, 60, 160, 360, 620] // covers the swap and a late render

  function collapseAll() {
    if (!matchMedia(MOBILE).matches) return
    for (const explorer of document.getElementsByClassName("explorer")) {
      explorer.classList.add("collapsed")
      explorer.setAttribute("aria-expanded", "false")
    }
    document.documentElement.classList.remove("mobile-no-scroll")
  }

  let timers = []
  function collapseAndHold() {
    timers.forEach(clearTimeout)
    timers = REASSERT_MS.map((ms) => setTimeout(collapseAll, ms))
    collapseAll()
  }

  // A link inside the menu was activated: close now, and stay closed across the
  // body swap that follows.
  document.addEventListener(
    "click",
    (e) => {
      const t = e.target
      if (t && t.closest && t.closest(".explorer a")) collapseAndHold()
    },
    true,
  )

  // First load, and any navigation that actually changes the page. Same-path
  // `nav` events are ignored so they cannot close an open menu.
  let lastPath = null
  function onNav() {
    const path = location.pathname
    if (path === lastPath) return
    lastPath = path
    collapseAndHold()
  }

  document.addEventListener("nav", onNav)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onNav, { once: true })
  } else {
    onNav()
  }
})()
