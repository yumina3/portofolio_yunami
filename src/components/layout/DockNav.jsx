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
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Di layar kecil: item lebih rapat + bisa di-scroll horizontal bila
          masih kurang, jadi tidak pernah melebar keluar layar.
          Di layar besar (lg): kembali ke tampilan semula (label muncul). */}
      <ul className="no-scrollbar glass flex h-14 max-w-full items-center gap-0.5 overflow-x-auto rounded-full px-1.5 shadow-[var(--shadow-lg)] sm:gap-1 sm:px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
                className={`flex h-11 items-center justify-center gap-1.5 rounded-full px-2 text-[13px] font-medium text-ocean transition-colors duration-200 hover:bg-foam/60 sm:px-2.5 lg:gap-2 lg:px-3 ${
                  isActive ? 'bg-turquoise text-ocean' : 'text-ocean/80'
                }`}
              >
                <DataIcon name={item.icon} size={18} forceIcon className="shrink-0 lg:h-5 lg:w-5" />
                <span className={isActive ? 'inline' : 'hidden lg:inline'}>{item.label}</span>
              </button>
            </li>
          )
        })}
        <li aria-hidden="true" className="mx-0.5 h-6 w-px shrink-0 bg-ocean/15 sm:mx-1" />
        <li className="shrink-0">
          <QualityControl />
        </li>
      </ul>
    </nav>
  )
}
