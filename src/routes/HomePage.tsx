import { Link } from 'react-router'
import { WallSection } from '../components/WallSection'
import { CONTACT, INTRO, REGULATED_NOTE, SERVICES } from '../content/site'
import { formatIndex } from '../lib/format'
import styles from '../styles/sections.module.css'

export function HomePage() {
  return (
    <>
      <title>Corrino Tech · Jimson Yang, mobile app consulting</title>

      <section className={styles.intro} aria-labelledby="intro-heading">
        <h1 id="intro-heading" className={styles.name}>
          {INTRO.name}
          <span className={styles.nameSquare} aria-hidden="true" />
        </h1>
        <div className={styles.introBody}>
          <p className={styles.role}>{INTRO.role}</p>
          <p className={styles.lead}>{INTRO.lead}</p>
          <p className={styles.muted}>{INTRO.location}</p>
          <div className={styles.actions}>
            <a className={styles.buttonPrimary} href={`mailto:${CONTACT.email}`}>
              Email me
            </a>
            <a className={styles.buttonSecondary} href={CONTACT.phoneHref}>
              Call or text {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <WallSection />

      <section className={styles.section} aria-labelledby="services-heading">
        <h2 id="services-heading" className={styles.sectionLabel}>
          What I do
        </h2>
        <div className={styles.sectionBody}>
          <ol className={styles.rows}>
            {SERVICES.map((service, index) => (
              <li key={service.title} className={styles.row}>
                <span className={styles.number}>{formatIndex(index)}</span>
                <div>
                  <h3 className={styles.rowTitle}>{service.title}</h3>
                  <p className={styles.rowBody}>{service.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.note}>{REGULATED_NOTE}</p>
          <div className={styles.actions}>
            <Link className={styles.buttonSecondary} to="/work">
              See the work
            </Link>
            <Link className={styles.buttonSecondary} to="/process">
              How a project runs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
