// Marks the menu item for the page being viewed, and stops a page from
// repeating that item's name as its own heading.
//
// The marking is done here rather than leaning on the explorer's own `.active`
// class, which it only puts on file links — never on a folder such as
// "Off the clock" — so a section and its children would otherwise light
// nothing at all.

function currentPath() {
  return location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/"
}

function activeNavLink(bar: Element): HTMLAnchorElement | null {
  const links = bar.querySelectorAll<HTMLAnchorElement>(".explorer-ul a")
  const here = currentPath()
  let best: HTMLAnchorElement | null = null
  let bestLen = -1
  for (const link of links) {
    const path = new URL(link.href, location.origin).pathname.replace(/\/$/, "") || "/"
    // the deepest matching prefix wins, so a poem still lights "Off the clock"
    const match = path === "/" ? here === "/" : here === path || here.startsWith(path + "/")
    if (match && path.length > bestLen) {
      best = link
      bestLen = path.length
    }
  }
  return best
}

function markCurrent(): boolean {
  const bar = document.querySelector(".explorer")
  if (!bar) return false

  const link = activeNavLink(bar)
  for (const other of bar.querySelectorAll(".nav-current")) {
    if (other !== link) other.classList.remove("nav-current")
  }

  // The explorer empties its list and rebuilds it on every navigation, so an
  // empty bar means "not rendered yet", not "no current page".
  if (!link) return !!bar.querySelector(".explorer-ul a")

  link.classList.add("nav-current")

  // A page whose heading simply repeats the menu item that leads to it says
  // nothing twice — the rail already shows where you are. Titles that differ
  // (a poem, an article) are left alone.
  const title = document.querySelector<HTMLElement>("h1.article-title")
  if (title) {
    const same = title.textContent?.trim() === link.textContent?.trim()
    title.classList.toggle("is-echo", same)
  }

  return true
}

// The list is built asynchronously — the explorer fetches the content index
// before rendering any links — so one attempt on `nav` usually finds nothing.
// Retrying covers that, and an observer catches any later rebuild.
let retry: ReturnType<typeof setTimeout> | undefined

function markUntilReady(attempt = 0) {
  if (markCurrent()) return
  if (attempt >= 25) return // ~2.5s; the bar is genuinely empty
  retry = setTimeout(() => markUntilReady(attempt + 1), 100)
}

const navObserver = new MutationObserver(() => markCurrent())

document.addEventListener("nav", () => {
  clearTimeout(retry)
  markUntilReady()

  navObserver.disconnect()
  const bar = document.querySelector(".explorer")
  if (bar) navObserver.observe(bar, { childList: true, subtree: true })
})
