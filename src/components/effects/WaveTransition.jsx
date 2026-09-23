import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WAVE_PATH } from './WaveDivider'
import { useQuality } from '../../hooks/useQuality'

gsap.registerPlugin(ScrollTrigger)

// Zona transisi ombak antar act (DESAIN.md 8.3).
// 3 layer (Low: 2, Off: pembatas statis), yPercent 100 -> -100 dengan scrub.
// nextFill = warna atas act berikutnya, agar tidak ada sambungan yang terlihat.
// prevFill = warna dasar act sebelumnya (opsional). Bila diisi, layer belakang &
//            tengah memakai nuansa prevFill -> nextFill supaya transisi antar
//            section menyatu (blend), bukan terpotong tegas.
export function WaveTransition({ nextFill = 'var(--foam)', prevFill }) {
  const quality = useQuality().quality
  const scope = useRef(null)

  // Warna layer belakang & tengah. Tanpa prevFill, pertahankan tampilan lama
  // (shallow + turquoise). Dengan prevFill, blend dari prevFill ke nextFill.
  const backFill = prevFill || 'var(--shallow)'
  const midFill = prevFill || 'var(--turquoise)'

  useGSAP(
    () => {
      if (quality === 'off') return
      const layers = scope.current?.querySelectorAll('[data-wave-layer]')
      if (!layers) return

      layers.forEach((layer) => {
        const speed = Number(layer.dataset.speed || 1)
        gsap.fromTo(
          layer,
          { yPercent: 100 * speed },
          {
            yPercent: -100 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: scope.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    },
    { scope, dependencies: [quality] }
  )

  // Quality Off: pembatas statis (DESAIN.md 8.3).
  if (quality === 'off') {
    return (
      <div aria-hidden="true" className="relative">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 90 }}>
          <path d={WAVE_PATH} fill={nextFill} />
        </svg>
      </div>
    )
  }

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="relative h-[42vh] w-full overflow-hidden"
    >
      {/* Layer belakang */}
      <div
        data-wave-layer
        data-speed="0.6"
        className="absolute inset-0 flex items-end"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
          <path d={WAVE_PATH} fill={backFill} opacity="0.6" />
        </svg>
      </div>

      {/* Layer tengah (hanya High & Low) */}
      <div
        data-wave-layer
        data-speed="0.8"
        className="absolute inset-0 flex items-end"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
          <path d={WAVE_PATH} fill={midFill} opacity="0.8" />
        </svg>
      </div>

      {/* Layer depan: warna act berikutnya + garis buih foam 4px di puncak */}
      <div
        data-wave-layer
        data-speed="1"
        className="absolute inset-0 flex items-end"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
          <path d={WAVE_PATH} fill={nextFill} />
          <path d={WAVE_PATH} fill="none" stroke="#FFFDF7" strokeWidth="4" />
        </svg>
      </div>
    </div>
  )
}
