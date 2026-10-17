# Design Brief: consulting.jimsonyang.com

Last updated: 2026-10-17 · Filled by: agent (Claude), from the user's request and the Notion "Mobile Apps" notes

---

## 1. The product in one breath

- **What is it?** A one-page site for Jimson Yang's mobile app consulting (branded iOS and Android apps for businesses), reached from the QR code on his business card.
- **Who uses it?** A small-business owner or manager (a dispensary owner, a med spa manager, a shop with a few locations) who was just handed a card in person and scans it on their phone, often while standing in their own store.
- **What is the one thing they must be able to do fastest?** Understand that Jimson builds branded mobile apps and contact him (email or call/text).
- **How often, and where?** Once or twice, on a phone, for under a minute. Sometimes later on a laptop before a second meeting.
- **How should they feel afterward?** Trusted: this is a real, competent person who knows their business.

## 2. Constraints

- **Brand / existing assets:** None for consulting. Name, phone, email and the QR code are fixed by the business card. Business card design 2 ("Swiss grid") shares this site's type and accent. (assumed)
- **Platform & viewports:** Phone first (QR scans), desktop second. Smallest width 320px.
- **Content shape:** About 450 words: intro, four services, a regulated-industries note, four process steps, five background items, contact. No images, no client logos (none yet).
- **Tech:** Follows web-dev-standards: React 19, TypeScript, Vite, React Router. Static build on GitHub Pages at consulting.jimsonyang.com.
- **Hard no's from the user:** No AI-sounding copy (run through the humanizer). No pricing on the page. Mobile app consulting for any local business, not cannabis-only.

## 3. The generic version (write it down so you can avoid it)

> A centered hero with "Transforming businesses with AI" and two pill buttons over a purple-blue gradient, a row of three icon cards (Strategy, Development, Growth), a testimonial carousel, and a contact form in a rounded card.

## 4. References

| Reference | What we take from it | What we explicitly don't take |
|---|---|---|
| Josef Müller-Brockmann's 1950s–60s concert posters | Flush-left grotesk type on a strict column grid, with the grid itself visible as structure | Abstract geometric artwork, multi-color fields |
| A printed consultancy brochure or annual report (numbered sections, hairline rules) | Numbered sections (01, 02…) separated by full-width hairlines instead of cards | Glossy photography, stock imagery |
| Business card design 2 ("Swiss grid") from the card canvas | Archivo type and the single red accent square, so card and site read as one identity | The card's fixed 3.5×2 composition |

## 5. Directions explored

**Structure (information architecture).**

| # | Structure | Best at | Worst at |
|---|---|---|---|
| A | Long single page: intro, services, process, background, contact, with a sticky contact bar on phones | One scroll answers everything; contact always one tap away | Long on desktop |
| B | Multi-page site: Home, Services, About, Contact | Room to grow, SEO per page | A QR visitor has to navigate; three taps to contact |
| C | Contact-card first: a digital business card (name, call, email, save contact) with a "what I do" list below | Fastest path to contact | Too thin to build trust before a second meeting |

**Aesthetic.**

| # | Visual thesis (one line) | Why it could fit |
|---|---|---|
| 1 | Swiss consultancy brochure: big flush-left Archivo name, numbered sections on hairline rules, warm white and black with one red square, no cards, no radius | Reads as precise and senior; matches card 2 |
| 2 | Luxury editorial: Fraunces serif display, cream paper, wide margins, italic asides | Feels established and calm; matches card 3 |
| 3 | Terminal: IBM Plex Mono, graphite background, green prompt marks | Signals "engineer" immediately; matches card 4 |

## 6. Rejected directions

- B (multi-page): QR visitors are on a phone for under a minute; every extra page loses some of them, and there isn't enough content to fill four pages.
- C (contact card first): too thin for the owner who looks the site up again before meeting 2, which is when trust gets decided.
- Aesthetic 2 (luxury editorial): serif and cream reads as boutique or lifestyle, which undersells the engineering side.
- Aesthetic 3 (terminal): alienates non-technical owners, who are most of the audience.

## 7. Decision

- **Structure:** A. One page in reading order, plus a sticky call/email bar on phones.
- **Visual thesis:** A Swiss consultancy brochure: huge flush-left "Jimson Yang" in Archivo, sections numbered 01 to 04 and split by full-width hairlines, black on warm white, one red square as the only color, nothing rounded and nothing in a card.
- **Chosen by:** agent. The user asked for "professional" and was away while this was built. Swiss is the most neutral of the three for a mixed audience of owners, and it pairs with card 2. Cards 1 to 8 are still open; if another card wins, the tokens in `DESIGN.md` change and the layout stays.
- **The detail that makes it this and not the generic version:** Oversized tabular section numbers (01–04) in the left column of a strict grid, with the red square as the only ornament.

## 8. Success check

- A phone visitor finds "Email me" or "Call or text" within 3 seconds without scrolling.
- With the text blurred, a screenshot shows a big left-aligned name, hairlines and one red square, with no cards.
- The copy passes a humanizer read: no "not X but Y", no triads for rhythm, no dashes.
