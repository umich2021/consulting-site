import { useEffect, useRef, useState, type RefObject } from 'react'
import type { TextCue, VideoWithText } from '../lib/videoCues'
import styles from './VideoStage.module.css'

type VideoStageProps = {
  video: VideoWithText
  /** Shows native controls, for the studio. */
  controls?: boolean
  /** Lets the studio read and seek the playhead. */
  videoRef?: RefObject<HTMLVideoElement | null>
  label?: string
}

const positionClass: Record<TextCue['position'], string> = {
  'top-left': styles.topLeft,
  'top-center': styles.topCenter,
  'top-right': styles.topRight,
  'center-left': styles.centerLeft,
  center: styles.center,
  'center-right': styles.centerRight,
  'below-center': styles.belowCenter,
  'bottom-left': styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
  'bottom-right': styles.bottomRight,
}

/** A looping video with text cues laid over it in sync with playback. */
export function VideoStage({ video, controls = false, videoRef, label }: VideoStageProps) {
  const ownRef = useRef<HTMLVideoElement>(null)
  const ref = videoRef ?? ownRef
  const [time, setTime] = useState(0)

  // Follow the playhead every frame so cues come and go on the exact frame.
  useEffect(() => {
    let frame = 0
    const tick = () => {
      if (ref.current) setTime(ref.current.currentTime)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [ref])

  // People who ask for less motion get the still poster and every cue at rest.
  useEffect(() => {
    const element = ref.current
    if (!element || controls) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (query.matches) element.pause()
      else element.play().catch(() => {})
    }
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [ref, controls])

  return (
    <div className={styles.stage}>
      <video
        ref={ref}
        className={styles.video}
        src={video.src}
        poster={video.poster}
        autoPlay={!controls}
        muted
        loop
        playsInline
        controls={controls}
        preload="metadata"
        aria-label={label}
        aria-hidden={label ? undefined : true}
      />
      {video.dim > 0 && <div className={styles.dim} style={{ opacity: video.dim }} aria-hidden="true" />}
      {!video.blank && (
        <div className={styles.layer} aria-live="off">
          {video.cues.map((cue, index) => {
            const isOn = time >= cue.start && time < cue.end
            return (
              <p
                key={`${index}-${cue.text}`}
                className={[styles.cue, styles[cue.size], styles[cue.motion], positionClass[cue.position], isOn ? styles.on : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {cue.text}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}
