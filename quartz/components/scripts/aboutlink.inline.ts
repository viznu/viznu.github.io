// Keep an "About" link (→ home) as the first sidebar nav entry. The explorer
// builds its list from the content trie, which never includes the root index
// page as a child node — so the link is inserted client-side whenever the
// explorer (re)renders its list.
function ensureAboutLink() {
  const uls = document.querySelectorAll(".explorer-ul")
  for (const ul of uls) {
    if (ul.querySelector("[data-about-link]")) continue
    // wait until the explorer has rendered real entries
    if (!ul.querySelector("a.nav-file-title, a.folder-button")) continue

    const li = document.createElement("li")
    const a = document.createElement("a")
    a.href = "/"
    a.className = "nav-file-title"
    a.setAttribute("data-about-link", "")
    a.textContent = "About"
    const slug = document.body?.dataset?.slug ?? ""
    if (slug === "index" || slug === "") a.classList.add("active")
    li.appendChild(a)

    const spacer = ul.querySelector(".overflow-end")
    if (spacer?.nextSibling) {
      ul.insertBefore(li, spacer.nextSibling)
    } else if (spacer) {
      ul.appendChild(li)
    } else {
      ul.insertBefore(li, ul.firstChild)
    }
  }
}

// the explorer populates asynchronously (after fetching the content index),
// so watch its list for renders rather than racing it
const aboutLinkObserver = new MutationObserver(ensureAboutLink)

document.addEventListener("nav", () => {
  ensureAboutLink()
  for (const ul of document.querySelectorAll(".explorer-ul")) {
    aboutLinkObserver.observe(ul, { childList: true })
  }
})
