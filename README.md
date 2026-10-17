# consulting-site

Jimson Yang's mobile app consulting site, live at https://corrinotech.com under the Corrino Tech name. The business card QR code points to consulting.jimsonyang.com, which redirects here (repo `umich2021/consulting-redirect`).

- Copy: `CONTENT.md` (mirrored in `src/content/site.ts`)
- Design: `DESIGN_BRIEF.md` and `DESIGN.md` (tokens in `src/styles/tokens.css`)
- Stack: React 19, TypeScript, Vite, React Router

```bash
npm install
npm run dev
npm run build
```

Deploy with `npm run deploy`: it builds and pushes `dist/` to the `gh-pages` branch, which GitHub Pages serves. DNS (Porkbun): corrinotech.com A records → GitHub Pages, www CNAME → umich2021.github.io. The previous apex record was `A 216.150.1.1` (the Aventos site on Vercel).
