import { useId, useState } from 'react'
import type { Step } from '../content/site'
import { formatIndex } from '../lib/format'
import styles from './Timeline.module.css'

type TimelineProps = { steps: Step[] }

/**
 * Steps on a line. Each step shows its title; hovering, focusing or tapping it reveals the detail.
 * Tapping works on phones, where there is no hover.
 */
export function Timeline({ steps }: TimelineProps) {
  const [active, setActive] = useState<number | null>(null)
  const baseId = useId()

  return (
    // Hover only follows a real mouse; a tap also fires pointer events and would open then close the step.
    <ol className={styles.timeline} onPointerLeave={(event) => event.pointerType === 'mouse' && setActive(null)}>
      {steps.map((step, index) => {
        const isOpen = active === index
        const detailId = `${baseId}-step-${index}`
        return (
          <li
            key={step.title}
            className={`${styles.step} ${isOpen ? styles.open : ''}`}
            onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(index)}
          >
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={detailId}
              onClick={(event) => {
                // A mouse click on an already-hovered step keeps it open; taps and keys toggle.
                if (event.detail > 0 && isOpen && window.matchMedia('(hover: hover)').matches) return
                setActive(isOpen ? null : index)
              }}
            >
              <span className={styles.node}>
                <span className={styles.number}>{formatIndex(index)}</span>
              </span>
              <span className={styles.title}>{step.title}</span>
              <span className={styles.toggle} aria-hidden="true" />
            </button>
            <div id={detailId} className={styles.detail} role="region" aria-label={step.title}>
              <p>{step.body}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
