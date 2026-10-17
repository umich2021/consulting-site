// Generates the product photos shown inside the wall-of-apps screens, through OpenRouter's image models.
// Run from the repo root: node --env-file=video/.env video/wall/images.mjs [image-id ...]
// Saves to video/wall/img/<id>.jpg (committed, small). Existing images are skipped.
import { writeFile, mkdir, access } from 'node:fs/promises'

const MODEL = 'google/gemini-3.1-flash-image'
const STYLE = 'Realistic commercial product photo for a mobile app, natural light, clean composition, no text, no logos, no watermark.'
const IMAGES = {
  pizza: 'A fresh wood-fired margherita pizza on a wooden board, overhead.',
  gym: 'A bright modern gym with dumbbells and a person mid-workout.',
  dog: 'A fluffy freshly groomed golden doodle sitting on a grooming table, happy.',
  car: 'A glossy clean unbadged generic SUV with no brand emblem coming out of a car wash, water beading on the paint.',
  flowers: 'A colorful hand-tied bouquet of peonies and ranunculus wrapped in kraft paper.',
  haircut: 'A clean skin fade haircut on a man in a barber chair, side view.',
  dental: 'A calm modern dental clinic exam room with soft daylight.',
  sneakers: 'A pair of bold colorful running sneakers on a plain pastel background.',
  house: 'A modern suburban family house with a green lawn at golden hour.',
  pastry: 'Flaky croissants and pastries on a bakery tray, close up.',
  spa: 'A spa treatment room with folded towels, candles and a massage table.',
  tacos: 'Three street tacos with cilantro, onion and lime on a plate, close up.',
}

const apiKey = process.env.OPENROUTER_API_KEY
if (!apiKey) throw new Error('OPENROUTER_API_KEY is missing. Put it in video/.env.')
const outDir = new URL('./img/', import.meta.url)
await mkdir(outDir, { recursive: true })
const only = process.argv.slice(2)

async function generate([id, prompt]) {
  const out = new URL(`${id}.jpg`, outDir)
  try {
    await access(out)
    return console.log(`${id}: exists, skipping`)
  } catch {}
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      modalities: ['image', 'text'],
      image_config: { aspect_ratio: '4:3' },
      messages: [{ role: 'user', content: `${prompt} ${STYLE}` }],
    }),
  })
  if (!response.ok) throw new Error(`${id}: ${response.status} ${await response.text()}`)
  const data = await response.json()
  const url = data.choices?.[0]?.message?.images?.[0]?.image_url?.url
  if (!url) throw new Error(`${id}: no image in response`)
  await writeFile(out, Buffer.from(url.split(',')[1], 'base64'))
  console.log(`${id}: saved, cost $${Number(data.usage?.cost ?? 0).toFixed(3)}`)
}

const entries = Object.entries(IMAGES).filter(([id]) => only.length === 0 || only.includes(id))
const results = await Promise.allSettled(entries.map(generate))
results.forEach((result) => result.status === 'rejected' && console.error(result.reason.message))
