import { useEffect, useState } from 'react'

// Scroll-spy dengan IntersectionObserver (DESAIN.md 5.1).
// Mengembalikan id section yang sedang aktif.
export function useScrollSpy(ids, { threshold = 0.5, rootMargin = '0px' } = {}) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        let bestId = activeId
        let bestRatio = 0
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })
        if (bestId && bestRatio > 0) setActiveId(bestId)
      },
      { threshold: [0, threshold, 1], rootMargin }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(','), threshold, rootMargin])

  return activeId
}
