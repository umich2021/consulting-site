# consulting-site

Jimson Yang's mobile app consulting site, live at https://consulting.jimsonyang.com. The QR code on the business cards points here.

- Copy: `CONTENT.md` (mirrored in `src/content/site.ts`)
- Design: `DESIGN_BRIEF.md` and `DESIGN.md` (tokens in `src/styles/tokens.css`)
- Stack: React 19, TypeScript, Vite, React Router

```bash
npm install
npm run dev
npm run build
```

Deploy with `npm run deploy`: it builds and pushes `dist/` to the `gh-pages` branch, which GitHub Pages serves. DNS is a Porkbun CNAME `consulting.jimsonyang.com → umich2021.github.io`.
