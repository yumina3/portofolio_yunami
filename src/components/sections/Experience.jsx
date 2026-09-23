import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'
import { experiences } from '../../data/experiences'
import { useQuality } from '../../hooks/useQuality'

gsap.registerPlugin(ScrollTrigger)

// Section Pengalaman: Timeline (DESAIN.md 6.4).
export function Experience() {
  const { quality } = useQuality()
  const scope = useRef(null)
  const animationsOn = quality !== 'off'

  useGSAP(
    () => {
      if (!animationsOn) return

      // Garis timeline scaleY 0 -> 1 dengan scrub (DESAIN.md 8.5).
      const timeline = scope.current.querySelector('[data-timeline]')
      const line = scope.current.querySelector('[data-timeline-line]')
      if (line && timeline) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        )
      }

      // Kemudi: intensitas cahaya (glow) mengikuti posisi scroll.
      // Saat kemudi di tengah viewport -> glow paling terang + skala naik sedikit.
      scope.current.querySelectorAll('[data-steer-glow]').forEach((el) => {
        gsap.fromTo(
          el,
          { '--steer-glow': 0.15, '--steer-scale': 0.94 },
          {
            '--steer-glow': 1,
            '--steer-scale': 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'center 55%',
              scrub: true,
            },
          }
        )
      })
    },
    { scope, dependencies: [quality] }
  )

  return (
    <section id="experience" ref={scope} className="relative px-6 py-20 md:py-[120px]">
      <div className="mx-auto max-w-container">
        <div className="text-center">
          <SectionTitle>Experience</SectionTitle>
          <p className="text-body mx-auto mt-3 max-w-prose text-[17px] leading-[1.65]">
            The story behind the numbers.
          </p>
        </div>

        {/* Timeline */}
        <div data-timeline className="relative mt-16">
          {/* Garis tengah (desktop) / kiri (mobile).
              top-6 disamakan dengan posisi kemudi pertama (top-6) supaya awalan
              garis tepat pas dengan kemudi, tidak lebih tinggi. */}
          <div className="absolute left-4 top-6 h-[calc(100%-1.5rem)] w-[3px] -translate-x-1/2 md:left-1/2">
            <div
              data-timeline-line
              className="h-full w-full origin-top rounded-full"
              style={{
                background: 'linear-gradient(to bottom, var(--turquoise), var(--coral))',
              }}
            />
          </div>

          <ul className="space-y-10">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0
              return (
                <li
                  key={exp.id}
                  className={`relative flex w-full flex-col md:flex-row ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Kemudi kapal sebagai penanda pada timeline (DESAIN.md 5.6)
                       - tepat di tengah garis (center horizontal & vertikal)
                       - rotasi kontinu (CSS) + glow mengikuti scroll (GSAP) */}
                  <span
                    className="pointer-events-none absolute left-4 top-6 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center md:left-1/2"
                    style={{
                      '--steer-glow': animationsOn ? 0.15 : 0.85,
                      '--steer-scale': 1,
                    }}
                  >
                    <span
                      data-steer-glow={animationsOn ? '' : undefined}
                      className="grid h-full w-full place-items-center"
                      style={{
                        transform: 'scale(var(--steer-scale, 1))',
                        filter:
                          'drop-shadow(0 0 calc(10px * var(--steer-glow, 0.85)) rgba(255, 200, 60, calc(1.1 * var(--steer-glow, 0.85)))) drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
                      }}
                    >
                      <img
                        src="/images/ship-steering.png"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain animate-steer-spin"
                      />
                    </span>
                  </span>
                  <div className={`w-full pl-12 md:w-[46%] md:pl-0 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <GlassCard className="p-6">
                      <span className="text-[13px] font-medium text-ocean/70">
                        {exp.startDate}
                      </span>
                      <h3 className="mt-1 text-[22px] font-bold text-ocean md:text-[28px]">{exp.role}</h3>
                      <p className="mt-1 text-[15px] font-medium text-turquoise">{exp.organization}</p>
                      <ul className="mt-4 space-y-2">
                        {exp.description.map((d) => (
                          <li key={d} className="flex gap-2 text-[15px] leading-[1.65] text-ocean/85">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.techStack.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-shallow px-3 py-1 text-[13px] font-medium text-ocean"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Kemudi penutup di ujung bawah garis (biar total 3 kemudi).
              Posisi disamakan dengan kemudi kartu: left-4 (mobile) / left-1/2 (desktop). */}
          <span
            className="pointer-events-none absolute left-4 bottom-0 z-10 grid h-10 w-10 -translate-x-1/2 translate-y-1/2 place-items-center md:left-1/2"
            style={{
              '--steer-glow': animationsOn ? 0.15 : 0.85,
              '--steer-scale': 1,
            }}
          >
            <span
              data-steer-glow={animationsOn ? '' : undefined}
              className="grid h-full w-full place-items-center"
              style={{
                transform: 'scale(var(--steer-scale, 1))',
                filter:
                  'drop-shadow(0 0 calc(10px * var(--steer-glow, 0.85)) rgba(255, 200, 60, calc(1.1 * var(--steer-glow, 0.85)))) drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
              }}
            >
              <img
                src="/images/ship-steering.png"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain animate-steer-spin"
              />
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
