import { PageHeader } from '../components/PageHeader'
import { ABOUT_LEAD, BACKGROUND, BACKGROUND_INTRO, ENDAL_WORK, TEAM, type BackgroundItem } from '../content/site'
import styles from '../styles/sections.module.css'

function ItemList({ items }: { items: BackgroundItem[] }) {
  return (
    <dl className={styles.rows}>
      {items.map((item) => (
        <div key={item.name} className={styles.definitionRow}>
          <dt className={styles.rowTitle}>{item.name}</dt>
          <dd className={styles.rowBody}>{item.body}</dd>
        </div>
      ))}
    </dl>
  )
}

export function AboutPage() {
  return (
    <>
      <title>About · Corrino Tech</title>
      <PageHeader title="About" lead={ABOUT_LEAD} />

      <section className={styles.section} aria-labelledby="team-heading">
        <h2 id="team-heading" className={styles.sectionLabel}>
          Team
        </h2>
        <div className={styles.sectionBody}>
          <dl className={styles.rows}>
            {TEAM.map((member) => (
              <div key={member.name} className={styles.definitionRow}>
                <dt>
                  <span className={styles.rowTitle}>{member.name}</span>
                  <span className={styles.label}> · {member.title}</span>
                </dt>
                <dd className={styles.rowBody}>{member.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="divit-heading">
        <h2 id="divit-heading" className={styles.sectionLabel}>
          Divit's consulting work
        </h2>
        <div className={styles.sectionBody}>
          <ItemList items={ENDAL_WORK} />
          <p className={styles.rowBody}>
            More at <a href="https://www.endaltechnologies.com">endaltechnologies.com</a>
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="jimson-heading">
        <h2 id="jimson-heading" className={styles.sectionLabel}>
          Jimson's background
        </h2>
        <div className={styles.sectionBody}>
          <p className={styles.lead}>{BACKGROUND_INTRO}</p>
          <ItemList items={BACKGROUND} />
        </div>
      </section>
    </>
  )
}
