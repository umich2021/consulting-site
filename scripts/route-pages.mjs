// GitHub Pages serves static files only. Copy the app shell to one HTML file per route so
// /work, /process, /about, /contact and /studio load with a 200 instead of falling through to 404.html.
import { copyFileSync } from 'node:fs'

const ROUTES = ['work', 'process', 'about', 'contact', 'studio']
copyFileSync('dist/index.html', 'dist/404.html')
for (const route of ROUTES) copyFileSync('dist/index.html', `dist/${route}.html`)
console.log(`Wrote 404.html and ${ROUTES.length} route pages`)
