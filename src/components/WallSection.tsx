import { useEffect, useRef } from 'react'
import { WALL } from '../content/site'
import styles from './WallSection.module.css'

export function WallSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // People who ask for less motion get the still poster instead of the loop.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (query.matches) video.pause()
      else video.play().catch(() => {})
    }
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  return (
    <section className={styles.wall} aria-labelledby="wall-heading">
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/wall-apps-poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/wall-apps.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <h2 id="wall-heading" className={styles.heading}>
          {WALL.heading}
          <span className={styles.square} aria-hidden="true" />
        </h2>
      </div>
    </section>
  )
}
