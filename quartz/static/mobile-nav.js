/*
 * Close the mobile nav after navigating.
 *
 * The explorer plugin already tries to collapse itself on `nav`, but it gates
 * that on `Element.checkVisibility()`, which Safari only shipped in 17.4. On
 * anything older the guard is falsy, so the menu is never collapsed — it opens
 * on load and stays open across navigation, leaving the toggle inverted.
 *
 * This does the same job with a feature test every browser passes, and also
 * closes the menu the moment a link inside it is clicked, so it retracts
 * immediately rather than waiting for the page swap.
 */
;(() => {
  "use strict"

  // The mobile toggle is display:none above the breakpoint, so its computed
  // display doubles as "are we in the mobile layout?".
  const isMobileNav = (btn) => btn && getComputedStyle(btn).display !== "none"

  function collapseAll() {
    for (const explorer of document.getElementsByClassName("explorer")) {
      const btn = explorer.querySelector(".mobile-explorer")
      if (!isMobileNav(btn)) continue
      explorer.classList.add("collapsed")
      explorer.setAttribute("aria-expanded", "false")
      document.documentElement.classList.remove("mobile-no-scroll")
    }
  }

  // Capture phase: fire before the SPA router swaps the page.
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target
      if (!target || !target.closest) return
      const link = target.closest(".explorer a")
      if (!link) return
      collapseAll()
    },
    true,
  )

  // After navigation, and on first load. Deferred a frame so it lands after the
  // plugin's own nav handler rather than racing it.
  const onNav = () => requestAnimationFrame(collapseAll)
  document.addEventListener("nav", onNav)
  document.addEventListener("render", onNav)
  if (document.readyState !== "loading") onNav()
  else document.addEventListener("DOMContentLoaded", onNav)
})()
