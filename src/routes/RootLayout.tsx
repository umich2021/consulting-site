import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router'
import { CONTACT, INTRO } from '../content/site'
import styles from './RootLayout.module.css'

const NAV_LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/process', label: 'Process' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function RootLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.wordmark}>
          <span className={styles.square} aria-hidden="true" />
          {INTRO.company}
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => (isActive ? styles.active : undefined)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
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

      <ScrollRestoration />
    </div>
  )
}
