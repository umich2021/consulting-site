import { PageHeader } from '../components/PageHeader'
import { Timeline } from '../components/Timeline'
import { STEPS } from '../content/site'
import styles from '../styles/sections.module.css'

export function ProcessPage() {
  return (
    <>
      <title>Process · Corrino Tech</title>
      <PageHeader title="How a project runs" />

      <section className={styles.timelineSection} aria-label="Steps">
        <Timeline steps={STEPS} />
      </section>
    </>
  )
}
