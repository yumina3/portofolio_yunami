import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import { SkillChip } from '../ui/SkillChip'
import { HeroBeachScene } from '../effects/HeroBeachScene'
import { profile } from '../../data/profile'
import { techBadges } from '../../data/skills'
import { useQuality } from '../../hooks/useQuality'
import { useLenis } from '../../hooks/useLenis'
import { scrollToSection } from '../../utils/scrollToSection'
import { CHIP_LOOK, CHIP_MOTION } from './chipConfig'

export function Hero() {
  const { quality } = useQuality()
  const lenis = useLenis()
  const scope = useRef(null)
  const [sceneReady, setSceneReady] = useState(false)

  // Parameter gerak chip (lihat chipConfig.js)
  const CHIP = CHIP_MOTION

  const high = quality === 'high'
  const animationsOn = quality !== 'off'
  // High: 8 chip. Low: 4 (semua tetap tersedia sebagai teks di section Skills).
  const desktopChips = high ? techBadges : techBadges.slice(0, 4)

  const handleSceneReady = useCallback(() => setSceneReady(true), [])

  // Intro konten hero + gerak chip.
  // Menunggu scene ilustrasi selesai "ombak datang", lalu kartu & chip muncul.
  useGSAP(
    () => {
      if (!animationsOn || !sceneReady) return

      const root = scope.current
      const reveals = root.querySelectorAll('[data-reveal]')
      const floatChips = root.querySelectorAll('[data-float-chip]')
      const parallaxChips = root.querySelectorAll('[data-parallax-chip]')
      const scrollPill = root.querySelector('[data-scroll-pill]')
      const scrollArrow = root.querySelector('[data-scroll-arrow]')

      const cleanups = []

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        reveals,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }
      )

      if (scrollPill) {
        tl.fromTo(scrollPill, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      }

      // Panah naik-turun pelan
      if (scrollArrow) {
        gsap.to(scrollArrow, { y: -4, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }

      // 1. Mengapung + drift melengkung (semua Quality kecuali Off)
      floatChips.forEach((chip, i) => {
        gsap.fromTo(chip, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.1 + i * 0.06 })
        gsap.to(chip, {
          y: gsap.utils.random(CHIP.floatY[0], CHIP.floatY[1]),
          duration: gsap.utils.random(CHIP.floatDur[0], CHIP.floatDur[1]),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 1.5),
        })
        gsap.to(chip, {
          x: gsap.utils.random(-CHIP.driftX[1], CHIP.driftX[1]),
          duration: gsap.utils.random(CHIP.driftDur[0], CHIP.driftDur[1]),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 2),
        })
        gsap.to(chip, {
          rotation: gsap.utils.random(-CHIP.floatRot, CHIP.floatRot),
          duration: gsap.utils.random(CHIP.floatDur[0], CHIP.floatDur[1]),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 1.5),
        })
      })

      // 2. Kilau kaca melintas (High)
      if (high) {
        root.querySelectorAll('[data-sheen]').forEach((sheen) => {
          const pass = () =>
            gsap.fromTo(
              sheen,
              { xPercent: -120 },
              {
                xPercent: 220,
                duration: 1.1,
                ease: 'power2.inOut',
                onComplete: () => {
                  const gap = gsap.utils.random(CHIP.sheenMin, CHIP.sheenMax)
                  const id = gsap.delayedCall(gap, pass)
                  cleanups.push(() => id.kill())
                },
              }
            )
          const start = gsap.delayedCall(gsap.utils.random(0.5, CHIP.sheenMax), pass)
          cleanups.push(() => start.kill())
        })
      }

      // 4. Menjauhi kursor + parallax mouse (High, desktop, pointer halus)
      if (high && window.matchMedia('(pointer: fine)').matches) {
        const setters = root.querySelectorAll('[data-mouse-chip]')
        const items = Array.from(setters).map((p) => ({
          el: p,
          depth: Number(p.dataset.depth || 1),
          xTo: gsap.quickTo(p, 'x', { duration: 0.5, ease: 'power3' }),
          yTo: gsap.quickTo(p, 'y', { duration: 0.5, ease: 'power3' }),
        }))

        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          items.forEach((s) => {
            let evadeX = 0
            let evadeY = 0
            const rect = s.el.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            const dx = cx - e.clientX
            const dy = cy - e.clientY
            const dist = Math.hypot(dx, dy)
            if (dist < CHIP.evadeRadius && dist > 0.001) {
              const force = (1 - dist / CHIP.evadeRadius) * CHIP.evadeMax
              evadeX = (dx / dist) * force
              evadeY = (dy / dist) * force
            }
            s.xTo(nx * CHIP.parallaxMouse * s.depth + evadeX)
            s.yTo(ny * CHIP.parallaxMouse * s.depth + evadeY)
          })
        }
        window.addEventListener('mousemove', onMove)
        cleanups.push(() => window.removeEventListener('mousemove', onMove))
      }

      // 5. Parallax kedalaman saat scroll (wrapper terluar, properti y saja)
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      parallaxChips.forEach((p) => {
        const depth = Number(p.dataset.depth || 1)
        st.to(p, { y: -CHIP.parallaxScroll * depth, ease: 'none' }, 0)
      })

      // 6. Riak air (High) untuk chip di area water
      if (high) {
        const ripples = root.querySelectorAll('[data-ripple]')
        ripples.forEach((r, i) => {
          gsap.fromTo(
            r,
            { scale: 0.8, opacity: 0.35 },
            {
              scale: 1.6,
              opacity: 0,
              duration: CHIP.rippleDur,
              ease: 'sine.out',
              repeat: -1,
              delay: (i % 2) * CHIP.rippleStagger,
              transformOrigin: '50% 50%',
            }
          )
        })
      }

      return () => cleanups.forEach((fn) => fn())
    },
    { scope, dependencies: [quality, sceneReady] }
  )

  const goToAbout = () => {
    scrollToSection(document.getElementById('about'), lenis)
  }

  return (
    <section
      id="hero"
      ref={scope}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-32 pt-24"
    >
      {/* Ilustrasi pantai tampak atas (dekoratif) */}
      <HeroBeachScene onReady={handleSceneReady} />

      {/* Overlay tipis agar teks tetap kontras di atas pasir/air */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 45%, rgba(255,253,247,0.28), rgba(255,253,247,0.05) 70%)' }}
      />

      {/* Chip mengapung (dekoratif; daftar skill yang sama ada sebagai teks di section Skills) */}
      <div aria-hidden="true" className="contents">
        {animationsOn &&
          desktopChips.map((chip) => (
            <div
              key={chip.name}
              data-parallax-chip
              data-depth={chip.depth}
              className="absolute z-20 hidden md:block"
              style={{ left: `${chip.pos.left}%`, top: `${chip.pos.top}%` }}
            >
              <div data-mouse-chip data-depth={chip.depth} className="chip-float">
                <div
                  data-float-chip
                  className="chip-float"
                  style={{
                    '--glass-alpha': CHIP_LOOK.glassAlpha,
                    '--glass-alpha-2': CHIP_LOOK.glassAlpha2,
                    '--tint-strength': CHIP_LOOK.tintStrength,
                  }}
                >
                  <SkillChip {...chip} quality={quality} sheen={high} />
                  {high && chip.zone === 'water' && (
                    <>
                      <span data-ripple className="chip-ripple" />
                      <span data-ripple className="chip-ripple" />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Konten tengah: cartoon sebagai pusat, teks mengelilinginya.
          Tanpa GlassCard frame — mengapung langsung di atas scene pantai. */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        {/* Baris atas: "Hello" (kiri kepala) + cartoon + "I am yunami" (kanan badan) */}
        <div className="relative flex items-stretch justify-center">
          <span
            data-reveal
            className="hero-glow mt-6 mr-1 self-start font-script text-[30px] leading-none text-ocean md:mt-10 md:mr-2 md:text-[46px]"
          >
            Hello
          </span>

          <img
            data-reveal
            src="/images/myCartoon.png"
            alt={`Ilustrasi ${profile.name}`}
            className="h-[210px] w-auto select-none drop-shadow-[0_18px_28px_rgba(11,60,93,0.22)] md:h-[300px]"
            draggable="false"
          />

          <div className="mb-6 ml-1 flex flex-col items-start self-end md:mb-14 md:ml-2">
            <span
              data-reveal
              className="hero-glow mb-1 font-script text-[26px] leading-none text-ocean md:mb-2 md:text-[38px]"
            >
              I am
            </span>
            <h1
              data-reveal
              className="hero-glow text-[22px] font-bold leading-none text-ocean md:text-[36px]"
            >
              {profile.name}
            </h1>
          </div>
        </div>

        {/* Headline di bawah cartoon, tetap di tengah */}
        <p
          data-reveal
          className="mt-6 max-w-prose text-center text-[17px] leading-[1.65] text-ocean/85 md:mt-8"
        >
          {profile.headline}
        </p>

        {/* Chip versi teks untuk mobile (kaca, ukuran lebih kecil) */}
        <div data-reveal className="mt-8 flex flex-wrap justify-center gap-2 md:hidden">
          {techBadges.slice(0, 4).map((chip) => (
            <SkillChip key={chip.name} {...chip} size="sm" quality={quality} />
          ))}
        </div>
      </div>

      {/* Indikator Scroll: pill kaca kecil di atas dock */}
      <button
        type="button"
        data-scroll-pill
        onClick={goToAbout}
        className="glass absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium text-ocean shadow-[var(--shadow-sm)]"
        style={{ opacity: animationsOn ? 0 : 1 }}
      >
        Scroll
        <span data-scroll-arrow aria-hidden="true" className="inline-flex">
          <ArrowDown size={16} />
        </span>
      </button>
    </section>
  )
}
