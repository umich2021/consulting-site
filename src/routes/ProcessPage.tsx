import { PageHeader } from '../components/PageHeader'
import { STEPS } from '../content/site'
import { formatIndex } from '../lib/format'
import styles from '../styles/sections.module.css'

export function ProcessPage() {
  return (
    <>
      <title>Process · Corrino Tech</title>
      <PageHeader title="How a project runs" />

      <section className={styles.section} aria-label="Steps">
        <p className={styles.sectionLabel}>Four steps</p>
        <div className={styles.sectionBody}>
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.number}>{formatIndex(index)}</span>
                <h2 className={styles.rowTitle}>{step.title}</h2>
                <p className={styles.rowBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
