import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Sun } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import { SmartImage } from '../ui/SmartImage'
import { profile } from '../../data/profile'
import { useQuality } from '../../hooks/useQuality'

// Section Tentang (DESAIN.md 6.2). Reveal di sini diperbolehkan (DESAIN.md 1).
export function About() {
  const { quality } = useQuality()
  const scope = useRef(null)
  const animationsOn = quality !== 'off'

  useGSAP(
    () => {
      if (!animationsOn) return
      const items = scope.current.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: scope.current, start: 'top 75%', once: true },
        }
      )
    },
    { scope, dependencies: [quality] }
  )

  return (
    <section id="about" ref={scope} className="relative px-6 py-20 md:py-[120px]">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Kiri: teks */}
        <div>
          <p data-reveal className="mb-4 inline-flex rounded-full bg-shallow px-4 py-1 text-sm font-medium text-ocean">
            About me
          </p>
          <h2
            data-reveal
            className="heading-highlight font-poppins text-[32px] font-bold leading-[1.15] md:text-[44px]"
          >
            Hi, I am {profile.name}. I build data-driven systems that solve real business problems.
          </h2>

          <div data-reveal className="mt-6 space-y-4">
            {profile.bio.map((para) => (
              <p key={para} className="text-body max-w-prose text-[17px] leading-[1.65]">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Kanan: foto di bingkai kaca */}
        <div data-reveal className="relative mx-auto w-full max-w-sm">
          <GlassCard variant="frame" className="overflow-hidden p-3">
            <SmartImage
              base={profile.photo}
              alt={`Portrait of ${profile.name}`}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[18px] bg-shallow object-cover"
            />
          </GlassCard>
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-sun text-ocean shadow-[var(--shadow-sm)]"
          >
            <Sun size={20} />
          </span>
        </div>
      </div>
    </section>
  )
}
