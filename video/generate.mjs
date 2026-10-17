// Generates the cinematic b-roll clips listed in a shot file through OpenRouter's video API.
// Run from the repo root: node --env-file=video/.env video/generate.mjs [--shots=shots-ad.json] [shot-id ...]
// Clips land in video/clips/ (not committed). Existing clips are skipped, so reruns only pay for missing shots.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'

const API = 'https://openrouter.ai/api/v1'
const POLL_MS = 15_000
const MAX_POLLS = 80

const apiKey = process.env.OPENROUTER_API_KEY
if (!apiKey) throw new Error('OPENROUTER_API_KEY is missing. Put it in video/.env.')

const args = process.argv.slice(2)
const shotsFile = args.find((arg) => arg.startsWith('--shots='))?.slice('--shots='.length) ?? 'shots.json'
const config = JSON.parse(await readFile(new URL(`./${shotsFile}`, import.meta.url), 'utf8'))
const only = args.filter((arg) => !arg.startsWith('--'))
const shots = config.shots.filter((shot) => only.length === 0 || only.includes(shot.id))
const clipsDir = new URL('./clips/', import.meta.url)
await mkdir(clipsDir, { recursive: true })

async function api(path, init = {}) {
  const url = path.startsWith('http') ? path : `${API}${path}`
  const response = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', ...init.headers },
  })
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`)
  return response
}

async function exists(url) {
  try {
    await access(url)
    return true
  } catch {
    return false
  }
}

async function generate(shot) {
  const out = new URL(`${shot.id}.mp4`, clipsDir)
  if (await exists(out)) {
    console.log(`${shot.id}: already generated, skipping`)
    return 0
  }

  const job = await (
    await api('/videos', {
      method: 'POST',
      body: JSON.stringify({
        model: config.model,
        prompt: config.style ? `${shot.prompt} ${config.style}` : shot.prompt,
        duration: config.duration,
        resolution: config.resolution,
        aspect_ratio: config.aspect_ratio,
        generate_audio: false,
      }),
    })
  ).json()
  console.log(`${shot.id}: submitted ${job.id}`)

  let status = job
  for (let attempt = 0; attempt < MAX_POLLS && status.status !== 'completed'; attempt += 1) {
    if (['failed', 'cancelled', 'expired'].includes(status.status)) {
      throw new Error(`${shot.id}: ${status.status} ${status.error ?? ''}`)
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_MS))
    const pollUrl = status.polling_url
      ? new URL(status.polling_url, 'https://openrouter.ai').href
      : `${API}/videos/${job.id}`
    status = await (await api(pollUrl)).json()
  }
  if (status.status !== 'completed') throw new Error(`${shot.id}: timed out`)

  const video = await api(`${API}/videos/${job.id}/content?index=0`)
  await writeFile(out, Buffer.from(await video.arrayBuffer()))
  const cost = Number(status.usage?.cost ?? 0)
  console.log(`${shot.id}: saved, cost $${cost.toFixed(2)}`)
  return cost
}

const results = await Promise.allSettled(shots.map(generate))
let total = 0
for (const [index, result] of results.entries()) {
  if (result.status === 'fulfilled') total += result.value
  else console.error(`${shots[index].id}: ${result.reason.message}`)
}
console.log(`Total reported cost: $${total.toFixed(2)}`)
