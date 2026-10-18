import heroVideo from '../content/hero-video.json'
import { parseVideoWithText } from '../lib/videoCues'
import { VideoStage } from './VideoStage'
import styles from './HeroVideo.module.css'

const VIDEO = parseVideoWithText(heroVideo, { src: '/media/tech-reel.mp4', blank: true, cues: [] })

export function HeroVideo() {
  return (
    <section className={styles.hero} aria-label="Corrino Tech reel">
      <VideoStage video={VIDEO} />
    </section>
  )
}
