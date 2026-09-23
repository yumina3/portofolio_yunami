import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

// Quality: 'high' | 'low' | 'off'  (DESAIN.md 9)
export const QualityContext = createContext(null)

const STORAGE_KEY = 'beach-quality'

function computeDefault(reducedMotion) {
  if (reducedMotion) return 'off'
  if (typeof window === 'undefined' || !window.navigator) return 'high'
  const narrow = window.matchMedia('(max-width: 767px)').matches
  const weak = (navigator.hardwareConcurrency || 8) <= 4
  return narrow || weak ? 'low' : 'high'
}

export function useQualityProvider() {
  const reducedMotion = useReducedMotion()
  const [override, setOverride] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      return window.localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  })

  const effective = override || computeDefault(reducedMotion)

  const setQuality = useCallback((value) => {
    setOverride(value)
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
  }, [])

  const resetQuality = useCallback(() => {
    setOverride(null)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  // Jika reduce-motion menyala, paksa 'off' agar konten selalu terbaca.
  useEffect(() => {
    if (reducedMotion && effective !== 'off') {
      setOverride('off')
    }
  }, [reducedMotion, effective])

  return useMemo(
    () => ({ quality: effective, setQuality, resetQuality, isOverride: Boolean(override) }),
    [effective, setQuality, resetQuality, override]
  )
}

export function useQuality() {
  const ctx = useContext(QualityContext)
  if (!ctx) {
    return { quality: 'high', setQuality: () => {}, resetQuality: () => {}, isOverride: false }
  }
  return ctx
}
