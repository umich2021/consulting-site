// Renders each motion graphics scene in mg.html to its own MP4 in video/clips/.
// Usage: node video/mg/capture.mjs <chromium-path>
import { mkdir, rm } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const FPS = 24
const SCENES = { rings: 2.5, map: 2.5, nodes: 2.5, phone: 2.2, stack: 2.2, mosaic: 2 }
const [executablePath] = process.argv.slice(2)
const ffmpeg = execFileSync('uv', ['run', '-q', '--with', 'imageio-ffmpeg', 'python', '-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim()
const clipsDir = fileURLToPath(new URL('../clips/', import.meta.url))

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
await page.goto(new URL('./mg.html', import.meta.url).href)
await page.evaluate(() => document.fonts.ready)

for (const [scene, seconds] of Object.entries(SCENES)) {
  const framesDir = fileURLToPath(new URL(`../frames/mg-${scene}/`, import.meta.url))
  await rm(framesDir, { recursive: true, force: true })
  await mkdir(framesDir, { recursive: true })
  await page.evaluate((name) => window.setScene(name), scene)
  for (let frame = 0; frame < seconds * FPS; frame += 1) {
    await page.evaluate((t) => window.renderAt(t), frame / FPS)
    await page.screenshot({ path: `${framesDir}${String(frame).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 })
  }
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', `${framesDir}%04d.jpg`,
    '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', `${clipsDir}mg-${scene}.mp4`])
  console.log(`mg-${scene}.mp4`)
}
await browser.close()
