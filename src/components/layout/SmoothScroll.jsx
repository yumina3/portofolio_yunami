import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisContext } from '../../hooks/useLenis'
import { useQuality } from '../../hooks/useQuality'

gsap.registerPlugin(ScrollTrigger)

// Menyinkronkan Lenis dengan GSAP ticker (DESAIN.md 8.2).
// Nonaktif saat Quality Off (DESAIN.md 9).
export function SmoothScroll({ children }) {
  const { quality } = useQuality()
  const [lenis, setLenis] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    if (quality === 'off') {
      // Pastikan ScrollTrigger & scroll native berjalan tanpa Lenis.
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        setLenis(null)
      }
      ScrollTrigger.refresh()
      return
    }

    const instance = new Lenis({ lerp: 0.1 })
    lenisRef.current = instance
    setLenis(instance)

    const onScroll = () => ScrollTrigger.update()
    instance.on('scroll', onScroll)

    const raf = (time) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Refresh trigger setelah layout/font stabil.
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh)
    }
    const t = setTimeout(refresh, 300)

    return () => {
      clearTimeout(t)
      gsap.ticker.remove(raf)
      instance.off('scroll', onScroll)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [quality])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
