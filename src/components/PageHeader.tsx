import styles from '../styles/sections.module.css'

type PageHeaderProps = { title: string; lead?: string }

export function PageHeader({ title, lead }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>
        {title}
        <span className={styles.nameSquare} aria-hidden="true" />
      </h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  )
}
