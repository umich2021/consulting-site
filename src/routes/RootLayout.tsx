import { Link, Outlet, useLocation } from 'react-router'
import { CONTACT, INTRO } from '../content/site'
import styles from './RootLayout.module.css'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#background', label: 'Background' },
  { href: '#contact', label: 'Contact' },
]

export function RootLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.wordmark}>
          <span className={styles.square} aria-hidden="true" />
          {INTRO.company}
        </Link>
        {isHome && (
          <nav aria-label="Sections" className={styles.nav}>
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <span>
          © 2026 {INTRO.company} · {INTRO.name}
        </span>
        <a href={CONTACT.personalSite}>{CONTACT.personalSiteLabel}</a>
      </footer>

      <nav aria-label="Contact" className={styles.contactBar}>
        <a className={styles.contactBarPrimary} href={`mailto:${CONTACT.email}`}>
          Email
        </a>
        <a className={styles.contactBarSecondary} href={CONTACT.phoneHref}>
          Call or text
        </a>
      </nav>
    </div>
  )
}
