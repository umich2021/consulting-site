import { useEffect, useRef, useState } from 'react'
import { VideoStage } from '../components/VideoStage'
import heroVideo from '../content/hero-video.json'
import {
  CUE_MOTIONS,
  CUE_POSITIONS,
  CUE_SIZES,
  parseVideoWithText,
  type TextCue,
  type VideoWithText,
} from '../lib/videoCues'
import styles from './StudioPage.module.css'

const SITE_VERSION = parseVideoWithText(heroVideo, { src: '/media/tech-reel.mp4', blank: true, cues: [] })
const DRAFT_KEY = 'corrino-studio-draft-v1'
const VIDEOS = [
  { src: '/media/tech-reel.mp4', poster: '/media/tech-reel-poster.jpg', label: 'Tech reel, satellite ending' },
  { src: '/media/tech-reel-city.mp4', poster: '/media/tech-reel-city-poster.jpg', label: 'Tech reel, city ending' },
  { src: '/media/wall-apps.mp4', poster: '/media/wall-apps-poster.jpg', label: 'Wall of apps' },
]

function loadDraft(): VideoWithText {
  try {
    const saved = localStorage.getItem(DRAFT_KEY)
    return saved ? parseVideoWithText(JSON.parse(saved), SITE_VERSION) : SITE_VERSION
  } catch {
    return SITE_VERSION
  }
}

const round = (value: number) => Math.round(value * 10) / 10

/** Unlisted page for placing text over the hero video. Copy the result into src/content/hero-video.json. */
export function StudioPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [draft, setDraft] = useState<VideoWithText>(loadDraft)
  const [copyStatus, setCopyStatus] = useState('')
  const json = JSON.stringify(draft, null, 2)

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch {
      // Private windows can block storage; the studio still works for this visit.
    }
  }, [draft])

  const now = () => round(videoRef.current?.currentTime ?? 0)
  const updateCue = (index: number, patch: Partial<TextCue>) =>
    setDraft((current) => ({ ...current, cues: current.cues.map((cue, i) => (i === index ? { ...cue, ...patch } : cue)) }))
  const removeCue = (index: number) =>
    setDraft((current) => ({ ...current, cues: current.cues.filter((_, i) => i !== index) }))
  const addCue = () => {
    const start = now()
    setDraft((current) => ({
      ...current,
      cues: [...current.cues, { text: 'Your text', start, end: round(start + 2), position: 'center', size: 'lg', motion: 'rise' }],
    }))
  }
  const chooseVideo = (src: string) => {
    const choice = VIDEOS.find((video) => video.src === src)
    if (choice) setDraft((current) => ({ ...current, src: choice.src, poster: choice.poster }))
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Copy blocked. Select the text below and copy it.')
    }
  }

  return (
    <>
      <title>Studio · Corrino Tech</title>
      <meta name="robots" content="noindex" />

      <div className={styles.studio}>
        <header className={styles.top}>
          <h1 className={styles.title}>Video text studio</h1>
          <p className={styles.help}>
            Place text over the video, then copy the result into <code>src/content/hero-video.json</code> (or send it to
            Claude). Your draft is kept in this browser.
          </p>
        </header>

        <div className={styles.preview}>
          <VideoStage video={draft} controls videoRef={videoRef} label="Video preview" />
        </div>

        <div className={styles.bar}>
          <label className={styles.field}>
            <span>Video</span>
            <select id="studio-video" value={draft.src} onChange={(event) => chooseVideo(event.target.value)}>
              {VIDEOS.map((video) => (
                <option key={video.src} value={video.src}>
                  {video.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.toggle}>
            <input
              id="studio-blank"
              type="checkbox"
              checked={draft.blank}
              onChange={(event) => setDraft((current) => ({ ...current, blank: event.target.checked }))}
            />
            <span>Blank (no text)</span>
          </label>
          <button type="button" className={styles.primary} onClick={addCue}>
            Add text at playhead
          </button>
          <button type="button" className={styles.secondary} onClick={() => setDraft(SITE_VERSION)}>
            Reset to live version
          </button>
        </div>

        <ol className={styles.cues}>
          {draft.cues.length === 0 && <li className={styles.empty}>No text yet. Play the video and add text where you want it.</li>}
          {draft.cues.map((cue, index) => (
            <li key={index} className={styles.cue}>
              <label className={`${styles.field} ${styles.wide}`}>
                <span>Text</span>
                <input id={`cue-${index}-text`} value={cue.text} onChange={(event) => updateCue(index, { text: event.target.value })} />
              </label>
              <label className={styles.field}>
                <span>Starts (s)</span>
                <span className={styles.timeRow}>
                  <input
                    id={`cue-${index}-start`}
                    type="number"
                    step="0.1"
                    min="0"
                    value={cue.start}
                    onChange={(event) => updateCue(index, { start: Number(event.target.value) })}
                  />
                  <button type="button" className={styles.small} onClick={() => updateCue(index, { start: now() })}>
                    Now
                  </button>
                </span>
              </label>
              <label className={styles.field}>
                <span>Ends (s)</span>
                <span className={styles.timeRow}>
                  <input
                    id={`cue-${index}-end`}
                    type="number"
                    step="0.1"
                    min="0"
                    value={cue.end}
                    onChange={(event) => updateCue(index, { end: Number(event.target.value) })}
                  />
                  <button type="button" className={styles.small} onClick={() => updateCue(index, { end: now() })}>
                    Now
                  </button>
                </span>
              </label>
              <label className={styles.field}>
                <span>Position</span>
                <select id={`cue-${index}-position`} value={cue.position} onChange={(event) => updateCue(index, { position: event.target.value as TextCue['position'] })}>
                  {CUE_POSITIONS.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Size</span>
                <select id={`cue-${index}-size`} value={cue.size} onChange={(event) => updateCue(index, { size: event.target.value as TextCue['size'] })}>
                  {CUE_SIZES.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Entrance</span>
                <select id={`cue-${index}-motion`} value={cue.motion} onChange={(event) => updateCue(index, { motion: event.target.value as TextCue['motion'] })}>
                  {CUE_MOTIONS.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
              <button type="button" className={styles.remove} onClick={() => removeCue(index)} aria-label={`Remove "${cue.text}"`}>
                Remove
              </button>
            </li>
          ))}
        </ol>

        <section className={styles.output} aria-labelledby="output-heading">
          <div className={styles.outputHead}>
            <h2 id="output-heading">Result</h2>
            <button type="button" className={styles.primary} onClick={copy}>
              Copy
            </button>
            <span role="status" className={styles.status}>
              {copyStatus}
            </span>
          </div>
          <textarea id="studio-json" readOnly value={json} rows={12} onFocus={(event) => event.target.select()} />
        </section>
      </div>
    </>
  )
}
