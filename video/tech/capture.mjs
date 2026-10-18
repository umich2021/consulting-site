// Renders the light layer in overlay.html to video/clips/tech-overlay.mp4 (10 s, 24 fps, 1920x1080, on black).
// Usage: node video/tech/capture.mjs <chromium-path> [cuts-json]
import { mkdir, rm } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const FPS = 24
const SECONDS = 10
const [executablePath, cutsJson] = process.argv.slice(2)
const ffmpeg = execFileSync('uv', ['run', '-q', '--with', 'imageio-ffmpeg', 'python', '-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim()
const framesDir = fileURLToPath(new URL('../frames/tech-overlay/', import.meta.url))
const out = fileURLToPath(new URL('../clips/tech-overlay.mp4', import.meta.url))
await rm(framesDir, { recursive: true, force: true })
await mkdir(framesDir, { recursive: true })

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
if (cutsJson) await page.addInitScript((cuts) => { window.CUTS = cuts }, JSON.parse(cutsJson))
await page.goto(new URL('./overlay.html', import.meta.url).href)
for (let frame = 0; frame < FPS * SECONDS; frame += 1) {
  await page.evaluate((t) => window.renderAt(t), frame / FPS)
  await page.screenshot({ path: `${framesDir}${String(frame).padStart(4, '0')}.png` })
}
await browser.close()
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', `${framesDir}%04d.png`,
  '-c:v', 'libx264', '-crf', '12', '-pix_fmt', 'yuv420p', out])
console.log('Wrote clips/tech-overlay.mp4')
