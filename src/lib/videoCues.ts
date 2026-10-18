// Text that plays over a video in sync with it. Edited in /studio, stored in src/content/hero-video.json.

export const CUE_POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center',
  'center-right',
  'below-center',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const
export const CUE_SIZES = ['xl', 'lg', 'md', 'sm'] as const
export const CUE_MOTIONS = ['rise', 'fade', 'scale', 'wipe', 'cut'] as const

export type CuePosition = (typeof CUE_POSITIONS)[number]
export type CueSize = (typeof CUE_SIZES)[number]
export type CueMotion = (typeof CUE_MOTIONS)[number]

export type TextCue = {
  text: string
  start: number
  end: number
  position: CuePosition
  size: CueSize
  motion: CueMotion
}

export type VideoWithText = {
  src: string
  poster?: string
  /** true hides every cue and shows the footage on its own */
  blank: boolean
  /** 0 to 0.8: how much to darken the footage so text reads over bright frames */
  dim: number
  cues: TextCue[]
}

export const MAX_DIM = 0.8

const isOneOf = <T extends readonly string[]>(list: T, value: unknown): value is T[number] =>
  typeof value === 'string' && (list as readonly string[]).includes(value)

/** Checks pasted or stored JSON and drops anything malformed instead of breaking the page. */
export function parseVideoWithText(value: unknown, fallback: VideoWithText): VideoWithText {
  if (typeof value !== 'object' || value === null) return fallback
  const data = value as Record<string, unknown>
  const cues = Array.isArray(data.cues) ? data.cues : []
  return {
    src: typeof data.src === 'string' ? data.src : fallback.src,
    poster: typeof data.poster === 'string' ? data.poster : fallback.poster,
    blank: data.blank === true,
    dim: Number.isFinite(Number(data.dim)) ? Math.min(MAX_DIM, Math.max(0, Number(data.dim))) : fallback.dim,
    cues: cues.flatMap((raw) => {
      if (typeof raw !== 'object' || raw === null) return []
      const cue = raw as Record<string, unknown>
      const start = Number(cue.start)
      const end = Number(cue.end)
      if (typeof cue.text !== 'string' || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) return []
      return [{
        text: cue.text,
        start,
        end,
        position: isOneOf(CUE_POSITIONS, cue.position) ? cue.position : 'center',
        size: isOneOf(CUE_SIZES, cue.size) ? cue.size : 'lg',
        motion: isOneOf(CUE_MOTIONS, cue.motion) ? cue.motion : 'fade',
      }]
    }),
  }
}
