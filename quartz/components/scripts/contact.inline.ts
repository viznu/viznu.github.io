// Contact details sit directly under the social icons. The footer component
// only takes a map of links (rendered as icons), so the block is appended here
// rather than configured.
//
// A footer is rendered twice — once in the sidebar, once at the foot of the
// page — and CSS shows whichever suits the viewport: the sidebar on desktop,
// the page foot on phones. Both get a block so either can be the visible one.
//
// Addresses are written out in an obfuscated form to keep them out of reach of
// naive scrapers.
const CONTACT_LINES = ["vnair91 {at} gmail {dot} com", "vnair8 {at} alumni {dot} jh {dot} edu"]

function ensureContactBlocks() {
  for (const footer of document.querySelectorAll("footer")) {
    if (footer.querySelector(".contact-block")) continue

    const block = document.createElement("div")
    block.className = "contact-block"

    const label = document.createElement("p")
    label.className = "contact-label"
    label.textContent = "email at:"
    block.appendChild(label)

    for (const line of CONTACT_LINES) {
      const p = document.createElement("p")
      p.textContent = line
      block.appendChild(p)
    }
    // inside the footer, not beside it: #quartz-body is a grid and the footer
    // owns a named area, so a sibling would be auto-placed into an earlier row
    footer.appendChild(block)
  }
}

document.addEventListener("nav", ensureContactBlocks)
