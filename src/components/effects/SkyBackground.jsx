import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ACTS } from '../../data/sections'
import { useQuality } from '../../hooks/useQuality'

gsap.registerPlugin(ScrollTrigger)

// Latar berubah mengikuti scroll (DESAIN.md 8.3).
// Men-tween CSS variable --sky-top / --sky-bottom per act.
export function SkyBackground() {
  const { quality } = useQuality()
  const scope = useRef(null)

  useGSAP(
    () => {
      const root = document.documentElement

      if (quality === 'off') {
        // Berganti langsung per section: tween tanpa scrub, sekali saat masuk.
        ACTS.slice(1).forEach((act) => {
          ScrollTrigger.create({
            trigger: act.first,
            start: 'top 60%',
            onEnter: () => {
              root.style.setProperty('--sky-top', act.top)
              root.style.setProperty('--sky-bottom', act.bottom)
            },
            onEnterBack: () => {
              root.style.setProperty('--sky-top', act.top)
              root.style.setProperty('--sky-bottom', act.bottom)
            },
          })
        })
        return
      }

      ACTS.slice(1).forEach((act, i) => {
        const prev = ACTS[i]
        gsap.fromTo(
          root,
          { '--sky-top': prev.top, '--sky-bottom': prev.bottom },
          {
            '--sky-top': act.top,
            '--sky-bottom': act.bottom,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: act.first,
              start: 'top 90%',
              end: 'top 30%',
              scrub: true,
            },
          }
        )
      })
    },
    { scope, dependencies: [quality] }
  )

  return <span ref={scope} aria-hidden="true" className="hidden" />
}
