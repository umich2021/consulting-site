import { PageHeader } from '../components/PageHeader'
import { BACKGROUND, BACKGROUND_INTRO } from '../content/site'
import styles from '../styles/sections.module.css'

export function AboutPage() {
  return (
    <>
      <title>About · Corrino Tech</title>
      <PageHeader title="About" lead={BACKGROUND_INTRO} />

      <section className={styles.section} aria-label="Background">
        <p className={styles.sectionLabel}>Background</p>
        <div className={styles.sectionBody}>
          <dl className={styles.rows}>
            {BACKGROUND.map((item) => (
              <div key={item.name} className={styles.definitionRow}>
                <dt className={styles.rowTitle}>{item.name}</dt>
                <dd className={styles.rowBody}>{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
