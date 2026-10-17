import { PageHeader } from '../components/PageHeader'
import { CONTACT, CONTACT_HEADING } from '../content/site'
import styles from '../styles/sections.module.css'

export function ContactPage() {
  return (
    <>
      <title>Contact · Corrino Tech</title>
      <PageHeader title="Contact" lead={CONTACT_HEADING} />

      <section className={styles.section} aria-label="Ways to reach Jimson">
        <p className={styles.sectionLabel}>Reach me</p>
        <div className={styles.sectionBody}>
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
