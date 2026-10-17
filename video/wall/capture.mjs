// Renders wall.html frame by frame and writes JPEGs to video/frames/wall/.
// Usage: node video/wall/capture.mjs <chromium-path> [fps] [seconds]
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const [executablePath, fps = '30', seconds = '20'] = process.argv.slice(2)
const frameCount = Number(fps) * Number(seconds)
const outDir = fileURLToPath(new URL('../frames/wall/', import.meta.url))
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
await page.goto(new URL('./wall.html', import.meta.url).href)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(500)

for (let frame = 0; frame < frameCount; frame += 1) {
  await page.evaluate((t) => window.renderAt(t), frame / Number(fps))
  await page.screenshot({ path: `${outDir}${String(frame).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 })
}
await browser.close()
console.log(`Captured ${frameCount} frames`)
