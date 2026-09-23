import { useEffect, useRef, useState } from 'react'
import { Gauge } from 'lucide-react'
import { useQuality } from '../../hooks/useQuality'

// Panel Quality: High / Low / Off (DESAIN.md 8.5, 9). Disimpan di localStorage.
const OPTIONS = [
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
  { value: 'off', label: 'Off' },
]

export function QualityControl() {
  const { quality, setQuality } = useQuality()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Animation quality: ${quality}. Change setting`}
        className="flex h-11 items-center gap-2 rounded-full px-3 text-[13px] font-medium text-ocean transition-colors duration-200 hover:bg-foam/60"
      >
        <Gauge size={20} aria-hidden="true" />
        <span className="hidden lg:inline">Quality</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Animation quality"
          className="glass absolute bottom-16 right-0 w-44 rounded-2xl p-2 shadow-[var(--shadow-lg)]"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitemradio"
              aria-checked={quality === opt.value}
              onClick={() => {
                setQuality(opt.value)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-ocean ${
                quality === opt.value ? 'bg-turquoise' : 'hover:bg-foam/70'
              }`}
            >
              {opt.label}
              {quality === opt.value && <span aria-hidden="true">•</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
