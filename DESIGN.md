# Design System: Corrino Tech

> Category: Editorial / brand
> The business card on a web page: ivory paper, forest green ink, Playfair Display headings over Work Sans, thin brass rules and frames, and "CORRINO TECH" in spaced brass capitals. One light theme only (no dark mode, by request on 2026-10-18).

## 1. Visual Theme & Atmosphere

- **Thesis:** as above. Card 5C (forest front with brass frame, ivory back with green spine) is the reference for every choice.
- **Adjectives:** quiet, crafted, editorial, warm.
- **Signature elements:** the brass lockup (spaced capitals between rules), a thin brass frame inset on every dark band, and forest bands at the top (video) and bottom (footer) like the card's front.
- **References:** business card 5C → palette, fonts, frame and lockup; printed consultancy brochures → numbered sections on hairlines.

## 2. Color

| Role | Token | Value | Use |
|---|---|---|---|
| Background | `--color-bg` | `#FAF7F0` | page (card ivory) |
| Surface | `--color-surface` | `#FFFFFF` | inputs, sticky contact bar |
| Text | `--color-text` | `#183A2E` | body and headings (forest) |
| Text muted | `--color-text-muted` | `#4F5E57` | secondary lines (≥ 4.5:1 on ivory) |
| Label | `--color-label` | `#6E5E3A` | small uppercase labels, link hover (card's dark brass) |
| Rule | `--color-rule` | `#183A2E` | section hairlines |
| Rule subtle | `--color-rule-subtle` | `#DDD5C3` | rows inside a section |
| Primary | `--color-primary` | `#183A2E` | buttons, footer band |
| On primary | `--color-on-primary` | `#FAF7F0` | text on forest |
| Accent | `--color-accent` | `#C8A464` | brass: rules, frames, squares, lockups on forest. Decorative only on ivory (contrast too low for text there) |
| Video band | `--color-wall-bg` | `#0F241C` | behind and over video so dimmed footage stays green |

- No gradients except the scrim over video. Links are underlined, so color never carries meaning alone. Focus rings use forest.

## 3. Typography

- **Display:** Playfair Display 600, as on the card. Headlines, section numbers (lining figures) and large video text.
- **Body:** Work Sans 400/600, as on the card. Body, labels, buttons, the lockup.
- **Lockup:** Work Sans 600 uppercase at 0.3em tracking, brass on forest and forest on ivory, led or flanked by a brass rule.
- **Scale:** 14 / 16 / 18 / 22 / 32 / 48 / fluid 56→136 (headline).
- **Rules:** headings flush left, leading 0.98 for display. Uppercase only for labels and the lockup.

## 4. Spacing & Grid

- **Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 120 (`--space-1` … `--space-9`).
- **Grid:** 12 columns, 24px gutters, max width 1200px, side margins 16px on phones and 48px from 768px. Section label and number in columns 1–3, content in 4–12. On phones everything is one column.
- **Density:** spacious between sections (120px desktop, 72px phone); compact inside lists.

## 5. Layout & Composition

- Flush left everywhere except the video bands, which center their text like the front of the card.
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

- **Favicon:** forest square with a brass inset frame and ivory "CT" in a serif. Files: `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png`, all linked in `index.html`.

## 8. Voice & Brand

- **Tone:** plain, first person, specific. Numbers over adjectives.
- **Microcopy rules:** verbs on buttons ("Email me", "Call or text"). No exclamation marks. Copy lives in `CONTENT.md` and is checked with the humanizer skill.
- **No helper notes:** no grey lines explaining the page.

## 9. Anti-patterns

- No cards, no rounded corners, no shadows.
- No three-icon feature row, no gradients beyond the video scrim, no dark mode.
- No stock or AI illustrations, no emoji.
- No testimonials or client logos until real ones exist.
