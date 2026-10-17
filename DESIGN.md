# Design System: consulting.jimsonyang.com

> Category: Editorial / portfolio
> A Swiss consultancy brochure: huge flush-left "Jimson Yang" in Archivo, sections numbered 01 to 04 and split by full-width hairlines, black on warm white, one red square as the only color, nothing rounded and nothing in a card.

## 1. Visual Theme & Atmosphere

- **Thesis:** as above.
- **Adjectives:** typographic, gridded, sparse, exact.
- **Signature element:** oversized section numbers (01–04) in the left grid column, and a single red square next to the name.
- **References:** Müller-Brockmann posters → flush-left grotesk on a visible grid; printed consultancy brochures → numbered sections on hairlines; business card 2 → Archivo and the red square.

## 2. Color

| Role | Token | Light | Dark | Use |
|---|---|---|---|---|
| Background | `--color-bg` | `#F7F5F0` | `#121212` | page |
| Surface | `--color-surface` | `#FFFFFF` | `#1C1C1C` | sticky contact bar only |
| Text | `--color-text` | `#111111` | `#F2F0EB` | body, headings |
| Text muted | `--color-text-muted` | `#55524C` | `#A8A49C` | labels, secondary lines (≥ 4.5:1) |
| Rule | `--color-rule` | `#111111` | `#F2F0EB` | section hairlines |
| Rule subtle | `--color-rule-subtle` | `#D6D2C8` | `#3A3833` | rows inside a section |
| Accent | `--color-primary` | `#C8221B` | `#FF6257` | the square, primary button, link hover |
| On accent | `--color-on-primary` | `#FFFFFF` | `#121212` | text on the primary button |

- One accent, used for the square, the primary button and focus rings. No gradients. Links are underlined, so color never carries meaning alone.

## 3. Typography

- **Display:** Archivo 800. A grotesk with tight, wide-shouldered caps that holds up at 150px, and it matches card 2.
- **Body:** Archivo 400/500. One family keeps the page quiet; weight and size do the hierarchy.
- **Numerals:** Archivo with `font-variant-numeric: tabular-nums` for section numbers and the phone number.
- **Scale:** 14 / 16 / 18 / 22 / 32 / 48 / fluid 64→152 (name). Name to body ratio is about 8:1 on desktop, 4:1 on phone.
- **Rules:** headings flush left, tight leading (0.9 for the name, 1.1 for h2). Uppercase only for the small labels.

## 4. Spacing & Grid

- **Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 120 (`--space-1` … `--space-9`).
- **Grid:** 12 columns, 24px gutters, max width 1200px, side margins 16px on phones and 48px from 768px. Section label and number in columns 1–3, content in 4–12. On phones everything is one column.
- **Density:** spacious between sections (120px desktop, 72px phone); compact inside lists.

## 5. Layout & Composition

- Asymmetric and flush left. Nothing centered.
- Each section starts with a full-width 1px `--color-rule` hairline.
- Service and background items are rows separated by `--color-rule-subtle`, never cards.

## 6. Components

- **Radius:** 0 everywhere.
- **Borders & elevation:** 1px hairlines only. No shadows.
- **Buttons:** rectangular, 48px tall. Primary: `--color-primary` fill, `--color-on-primary` text. Secondary: 1px `--color-text` border, transparent fill. Hover darkens the fill or inverts the secondary. Focus: 2px `--color-primary` outline, 3px offset.
- **Inputs:** none (contact is email and phone links).
- **Data display:** numbered rows.
- **Navigation:** a one-line header with anchor links on desktop; on phones the header keeps only the name, and a sticky bottom bar holds "Email" and "Call or text".
- **Empty / loading / error states:** static page with no async data. The only error state is the 404 route, which uses the same header and a link home.

## 7. Motion & Interaction

- **Durations / easing:** 150ms, `ease`, for hover color changes only.
- **What moves and why:** smooth scroll to anchors for orientation.
- **Reduced motion:** smooth scroll and transitions are turned off.

## 7b. Favicon

- **Favicon:** a red square with a white "JY" in Archivo-style bold. Files: `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png`, all linked in `index.html`.

## 8. Voice & Brand

- **Tone:** plain, first person, specific. Numbers over adjectives.
- **Microcopy rules:** verbs on buttons ("Email me", "Call or text"). No exclamation marks. Copy lives in `CONTENT.md` and is checked with the humanizer skill.
- **No helper notes:** no grey lines explaining the page.

## 9. Anti-patterns

- No cards, no rounded corners, no shadows.
- No centered hero, no three-icon feature row, no gradient.
- No stock or AI illustrations, no emoji.
- No testimonials or client logos until real ones exist.
