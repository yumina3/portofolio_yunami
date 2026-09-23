import { useMemo } from 'react'
import { DataIcon } from '../ui/DataIcon'
import { NAV_ITEMS } from '../../data/sections'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useLenis } from '../../hooks/useLenis'
import { scrollToSection } from '../../utils/scrollToSection'
import { QualityControl } from './QualityControl'

// Dock navigasi mengambang (DESAIN.md 5.1).
export function DockNav() {
  const ids = useMemo(() => NAV_ITEMS.map((i) => i.id), [])
  const activeId = useScrollSpy(ids, { threshold: 0.5 })
  const lenis = useLenis()

  const go = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    scrollToSection(el, lenis)
  }

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="glass flex h-14 items-center gap-1 rounded-full px-2 shadow-[var(--shadow-lg)]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
                className={`flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-medium text-ocean transition-colors duration-200 hover:bg-foam/60 ${
                  isActive ? 'bg-turquoise text-ocean' : 'text-ocean/80'
                }`}
              >
                <DataIcon name={item.icon} size={20} />
                <span className={isActive ? 'inline' : 'hidden lg:inline'}>{item.label}</span>
              </button>
            </li>
          )
        })}
        <li aria-hidden="true" className="mx-1 h-6 w-px bg-ocean/15" />
        <li>
          <QualityControl />
        </li>
      </ul>
    </nav>
  )
}
