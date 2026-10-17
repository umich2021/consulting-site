import {
  BACKGROUND,
  BACKGROUND_INTRO,
  CONTACT,
  CONTACT_HEADING,
  INTRO,
  REGULATED_NOTE,
  SERVICES,
  STEPS,
} from '../content/site'
import styles from './HomePage.module.css'

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

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

      <section id="services" className={styles.section} aria-labelledby="services-heading">
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
        </div>
      </section>

      <section id="process" className={styles.section} aria-labelledby="process-heading">
        <h2 id="process-heading" className={styles.sectionLabel}>
          How a project runs
        </h2>
        <div className={styles.sectionBody}>
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.number}>{formatIndex(index)}</span>
                <h3 className={styles.rowTitle}>{step.title}</h3>
                <p className={styles.rowBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="background" className={styles.section} aria-labelledby="background-heading">
        <h2 id="background-heading" className={styles.sectionLabel}>
          Background
        </h2>
        <div className={styles.sectionBody}>
          <p className={styles.lead}>{BACKGROUND_INTRO}</p>
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

      <section id="contact" className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionLabel}>
          Contact
        </h2>
        <div className={styles.sectionBody}>
          <p className={styles.contactHeading}>{CONTACT_HEADING}</p>
          <dl className={styles.rows}>
            <div className={styles.contactRow}>
              <dt className={styles.label}>Email</dt>
              <dd>
                <a className={styles.contactLink} href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div className={styles.contactRow}>
              <dt className={styles.label}>Call or text</dt>
              <dd>
                <a className={styles.contactLink} href={CONTACT.phoneHref}>
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
