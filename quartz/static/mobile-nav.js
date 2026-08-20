/*
 * Mobile nav open/close state.
 *
 * The explorer's own markup defaults to OPEN: its stylesheet hides the panel
 * only when the element carries a `collapsed` class, and that class is added by
 * script. So every fresh copy of the page - a full load, or the body that the
 * SPA patches in with micromorph on navigation - arrives with the menu showing,
 * and stays that way unless script wins the race to re-add the class. The
 * plugin's own attempt is gated on Element.checkVisibility(), which Safari only
 * shipped in 17.4, so on older Safari nothing ever re-adds it.
 *
 * Rather than keep racing, the default is inverted. Visibility is driven from a
 * `nav-open` class on <html>, and the panel is hidden unless it is present:
 *
 *   - <html> is never touched by micromorph, which patches <body> only, so the
 *     state survives SPA navigation instead of being reset by it;
 *   - a full page load starts with no class at all, i.e. closed, which is the
 *     correct default rather than the wrong one;
 *   - no timing, ordering or feature-detection assumption decides whether the
 *     menu is visible.
 *
 * `collapsed`, `aria-expanded` and `mobile-no-scroll` are kept in step so the
 * plugin's own toggle stays coherent, re-applied on the next tick because the
 * plugin's handler runs after this one.
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

  // Bring the plugin's own state into line with ours.
  function apply() {
    if (!isMobile()) return
    const on = isOpen()
    html.classList.toggle("mobile-no-scroll", on)
    for (const explorer of document.getElementsByClassName("explorer")) {
      explorer.classList.toggle("collapsed", !on)
      explorer.setAttribute("aria-expanded", on ? "true" : "false")
    }
  }

  // The plugin reveals the hamburger by dropping `hide-until-loaded` at the end
  // of its async nav handler. If that handler ever fails, the button stays
  // display:none and the menu becomes unreachable, so drop it here too.
  function revealToggle() {
    for (const btn of document.getElementsByClassName("mobile-explorer")) {
      btn.classList.remove("hide-until-loaded")
    }
  }

  function setOpen(on) {
    html.classList.toggle(OPEN, on)
    revealToggle()
    apply()
    setTimeout(apply, 0) // after the plugin's click handler has had its turn
  }

  document.addEventListener(
    "click",
    (e) => {
      const t = e.target
      if (!t || !t.closest) return
      if (t.closest(".explorer .mobile-explorer")) {
        setOpen(!isOpen()) // the hamburger
      } else if (t.closest(".explorer a")) {
        setOpen(false) // a destination was chosen
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
    html.classList.remove(OPEN, "mobile-no-scroll")
    for (const explorer of document.getElementsByClassName("explorer")) {
      explorer.classList.remove("collapsed")
    }
  })

  setOpen(false)
})()
