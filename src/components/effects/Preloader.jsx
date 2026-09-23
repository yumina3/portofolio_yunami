import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { profile } from '../../data/profile'

// Preloader ombak (PRD A1, DESAIN.md 8.5).
// Angka 000% -> 100% mengikuti progres pemuatan aset nyata (gambar hero + font),
// air naik mengisi layar, lalu terbelah membuka hero. Maks ~2 detik, dan
// dilewati pada kunjungan berikutnya lewat sessionStorage.

const SEEN_KEY = 'beach-preloader-seen'

// Beri tahu seluruh aplikasi bahwa preloader selesai, agar animasi masuk
// (mis. HeroBeachScene) bisa dimulai tepat setelah layar terbuka.
function signalDone() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('beach:preloader-done'))
}

// Cek apakah perlu tampil (dijalankan sekali, sebelum render).
function shouldShow() {
  if (typeof window === 'undefined') return false
  try {
    if (window.sessionStorage.getItem(SEEN_KEY)) return false
  } catch {
    /* ignore */
  }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }
  return true
}

export function Preloader({ onDone }) {
  const [visible, setVisible] = useState(shouldShow)
  const [progress, setProgress] = useState(0)
  const scope = useRef(null)
  const heroImg = profile.photo

  // Hitung progres dari aset yang benar-benar dimuat.
  useEffect(() => {
    if (!visible) return
    let current = 0
    let raf = null
    let cancelled = false

    // Base path -> coba .jpg dulu (foto asli), lalu .svg (placeholder).
    const candidates = [heroImg, '/images/projects/hasil-bumi']
      .filter(Boolean)
      .flatMap((b) => [`${b}.jpg`, `${b}.svg`])
    const targets = candidates
    const loaded = new Set()

    // Progres sintetis yang melambat, agar tetap bergerak walau aset cepat.
    const tick = () => {
      if (cancelled) return
      const ratio = targets.length ? loaded.size / targets.length : 1
      const cap = 40 + ratio * 60 // minimal 40% dari waktu, sisanya dari aset
      current += Math.max(0.6, (cap - current) * 0.06)
      if (current >= 100) current = 100
      setProgress(current)
      if (current < 100) raf = requestAnimationFrame(tick)
      else finish()
    }

    const finish = () => {
      if (cancelled) return
      try {
        window.sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* ignore */
      }
    }

    const markLoaded = (src) => {
      loaded.add(src)
    }

    targets.forEach((src) => {
      const img = new Image()
      img.onload = img.onerror = () => markLoaded(src)
      img.src = src
    })

    // Font juga bagian dari progres.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => markLoaded('fonts'))
    } else {
      markLoaded('fonts')
    }

    // Jaring pengaman: jangan pernah lebih dari 2.2s.
    const hardStop = setTimeout(() => {
      current = 100
      setProgress(100)
      finish()
      if (raf) cancelAnimationFrame(raf)
    }, 2200)

    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      clearTimeout(hardStop)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [visible, heroImg])

  // Ketika progres mencapai 100, mainkan animasi belah lalu sembunyikan.
  useGSAP(
    () => {
      if (!visible || progress < 100) return
      const root = scope.current
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false)
          signalDone()
          onDone?.()
        },
      })
      tl.to(root.querySelector('[data-water]'), { yPercent: -110, duration: 0.7, ease: 'power3.inOut' }, 0)
        .to(root.querySelector('[data-count]'), { opacity: 0, duration: 0.3 }, 0)
        .to(root, { autoAlpha: 0, duration: 0.2 }, 0.6)
    },
    { dependencies: [progress, visible], scope }
  )

  if (!visible) return null

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[100] overflow-hidden bg-sky"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Angka persen */}
      <span
        data-count
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-script text-[64px] leading-none text-ocean md:text-[120px]"
      >
        {String(Math.floor(progress)).padStart(3, '0')}%
      </span>

      {/* Air laut naik mengisi layar */}
      <div
        data-water
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--turquoise), var(--ocean))' }}>
          <svg
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            className="absolute -top-[120px] left-0 w-full"
            style={{ height: 140 }}
          >
            <path
              d="M0,120 C240,60 480,180 720,120 C960,60 1200,180 1440,120 L1440,220 L0,220 Z"
              fill="var(--turquoise)"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
