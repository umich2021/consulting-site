import { PageHeader } from '../components/PageHeader'
import { WORK } from '../content/site'
import { formatIndex } from '../lib/format'
import styles from '../styles/sections.module.css'

export function WorkPage() {
  return (
    <>
      <title>Work · Corrino Tech</title>
      <PageHeader title="Selected work" />

      <section className={styles.section} aria-label="Projects">
        <p className={styles.sectionLabel}>Projects</p>
        <div className={styles.sectionBody}>
          <ol className={styles.work}>
            {WORK.map((item, index) => (
              <li key={item.title} className={styles.workItem}>
                <figure className={styles.workFigure}>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </figure>
                <div className={styles.row}>
                  <span className={styles.number}>{formatIndex(index)}</span>
                  <div>
                    <h2 className={styles.rowTitle}>
                      {item.href ? <a href={item.href}>{item.title}</a> : item.title}
                    </h2>
                    <p className={styles.label}>{item.meta}</p>
                    <p className={styles.rowBody}>{item.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
