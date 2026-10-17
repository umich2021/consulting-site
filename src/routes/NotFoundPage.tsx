import { Link } from 'react-router'
import styles from '../styles/sections.module.css'

export function NotFoundPage() {
  return (
    <>
      <title>Page not found · Corrino Tech</title>
      <section className={styles.intro} aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className={styles.name}>
          404
          <span className={styles.nameSquare} aria-hidden="true" />
        </h1>
        <div className={styles.introBody}>
          <p className={styles.lead}>This page doesn't exist.</p>
          <div className={styles.actions}>
            <Link className={styles.buttonPrimary} to="/">
              Back to the home page
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
