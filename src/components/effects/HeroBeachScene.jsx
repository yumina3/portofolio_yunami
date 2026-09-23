import { useRef, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useQuality } from '../../hooks/useQuality'
import { SCENE } from './beachSceneConfig'

gsap.registerPlugin(ScrollTrigger)

const VB = { w: 1920, h: 1080 }

/* Garis pembagi atas->bawah: air di atas, pasir di bawah.
 * FOAM_Y = posisi tepi air dalam viewBox. 540 = tepat tengah. */
const FOAM_Y = 540

/* Path area air (dari puncak viewBox sampai tepi bawah yang berombak).
 * Dipakai untuk mengisi air SEKALIGUS sebagai clip caustic, supaya
 * kotak-kotak air tidak pernah melampaui batas air ke pasir. */
const WATER_PATH = `M0,${FOAM_Y + 22} C 240,${FOAM_Y - 16} 480,${FOAM_Y + 48} 720,${FOAM_Y + 2} C 960,${FOAM_Y - 36} 1200,${FOAM_Y + 48} 1440,${FOAM_Y + 8} C 1680,${FOAM_Y - 26} 1800,${FOAM_Y + 34} 1920,${FOAM_Y + 20} L1920,0 L0,0 Z`

/* ------------------------------------------------------------------ *
 * PRNG dengan seed tetap -> posisi acak yang stabil antar render
 * ------------------------------------------------------------------ */
function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ================================================================== *
 * LAYER: Pasir (3 pita bukit + bintik pasir)
 * ================================================================== */
function SandLayer({ dots, sparks }) {
  return (
    <g data-layer="sand" aria-hidden="true">
      {/* Bukit pasir paling belakang (terang) */}
      <path
        d={`M0,${FOAM_Y - 60} C 320,${FOAM_Y - 130} 640,${FOAM_Y - 20} 960,${FOAM_Y - 80}
            C 1280,${FOAM_Y - 140} 1600,${FOAM_Y - 30} 1920,${FOAM_Y - 90}
            L1920,${VB.h} L0,${VB.h} Z`}
        fill="var(--sand-1)"
      />
      {/* Bukit pasir tengah */}
      <path
        d={`M0,${FOAM_Y - 10} C 300,${FOAM_Y - 80} 620,${FOAM_Y + 40} 980,${FOAM_Y - 30}
            C 1300,${FOAM_Y - 90} 1620,${FOAM_Y + 30} 1920,${FOAM_Y - 40}
            L1920,${VB.h} L0,${VB.h} Z`}
        fill="var(--sand-2)"
      />
      {/* Bukit pasir depan (paling gelap, dekat air) */}
      <path
        d={`M0,${FOAM_Y + 30} C 340,${FOAM_Y - 20} 600,${FOAM_Y + 70} 960,${FOAM_Y + 20}
            C 1320,${FOAM_Y - 30} 1580,${FOAM_Y + 80} 1920,${FOAM_Y + 10}
            L1920,${VB.h} L0,${VB.h} Z`}
        fill="var(--sand-3)"
      />
      {/* Bintik pasir halus */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="var(--sand-wet)" opacity={d.o} />
      ))}
      {/* Blink-blink pasir: titik cream yang berkelip (dianimasikan GSAP) */}
      {sparks.map((s, i) => (
        <circle
          key={`sp-${i}`}
          data-spark
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="var(--sand-1)"
          opacity="0"
        />
      ))}
    </g>
  )
}

/* ================================================================== *
 * LAYER: Air (gradasi + bagian atas masuk sedikit ke bawah buih)
 * ================================================================== */
function WaterLayer() {
  return (
    <g data-layer="water" aria-hidden="true">
      <defs>
        <linearGradient id="hbWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--water-a)" />
          <stop offset="100%" stopColor="var(--water-b)" />
        </linearGradient>
      </defs>
      {/* Area air: mengisi dari puncak viewBox sampai tepi berombak (WATER_PATH). */}
      <path d={WATER_PATH} fill="url(#hbWater)" />
    </g>
  )
}

/* ================================================================== *
 * LAYER: Caustic (2 tile seamless) di atas air
 * ================================================================== */
// Tile caustic seamless 600x400.
// Semua kurva bersifat periodik: titik awal = titik akhir (dan gradiennya sama),
// sehingga pola tersambung mulus saat di-tile. Bentuk yang menyentuh tepi
// di-duplikasi ke sisi berlawanan agar tak ada potongan yang terlihat.
function causticWave({ w, h, amp, phase, thickness }) {
  const steps = 6
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const x = (w * i) / steps
    const y = h / 2 + Math.sin(phase + (i / steps) * Math.PI * 2) * amp
    pts.push([x, y])
  }
  // Catmull-like halus via kubik antar titik (sederhana, mulus cukup)
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]
    const [cx, cy] = pts[i]
    const mx = (px + cx) / 2
    d += ` C${mx.toFixed(1)},${py.toFixed(1)} ${mx.toFixed(1)},${cy.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}`
  }
  return { d, thickness }
}

// Alur vertikal periodik (ditile pada sumbu Y). Seamless karena awal = akhir.
function causticColumn({ x, h, ampGap, phase, thickness }) {
  const steps = 5
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const y = (h * i) / steps
    const xx = x + Math.sin(phase + (i / steps) * Math.PI * 2) * ampGap
    pts.push([xx, y])
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]
    const [cx, cy] = pts[i]
    const my = (py + cy) / 2
    d += ` C${px.toFixed(1)},${my.toFixed(1)} ${cx.toFixed(1)},${my.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}`
  }
  return { d, thickness }
}

function CausticPattern({ id, color, opacity }) {
  const w = 600
  const h = 400
  // Tiga alur gelombang periodik pada fase berbeda (semua seamless horizontal).
  const lanes = [
    causticWave({ w, h, amp: 46, phase: 0, thickness: 9 }),
    causticWave({ w, h: h / 2, amp: 54, phase: Math.PI * 0.7, thickness: 8 }),
    causticWave({ w, h: h * 1.5, amp: 40, phase: Math.PI * 1.4, thickness: 7 }),
  ]
  // Bentuk cahaya organik (ellipse) yang di-wrap ke tepi berlawanan.
  const blobs = [
    { cx: 150, cy: 120, rx: 78, ry: 34 },
    { cx: 430, cy: 300, rx: 64, ry: 28 },
    { cx: 540, cy: 80, rx: 50, ry: 22 },
  ]
  const wrapped = []
  blobs.forEach((b) => {
    wrapped.push(b)
    wrapped.push({ ...b, cx: b.cx - w })
    wrapped.push({ ...b, cx: b.cx + w })
    wrapped.push({ ...b, cy: b.cy - h })
    wrapped.push({ ...b, cy: b.cy + h })
  })

  // Jaringan alur vertikal (seamless pada sumbu Y), di-wrap ke kiri/kanan.
  const cols = [
    causticColumn({ x: 200, h, ampGap: 26, phase: 0, thickness: 7 }),
    causticColumn({ x: 430, h, ampGap: 30, phase: Math.PI * 0.9, thickness: 6 }),
  ]

  return (
    <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" opacity={opacity}>
        {lanes.map((lane, i) => (
          <g key={i}>
            {/* konten utama + salinan bergeser satu tile agar tepi tersambung */}
            <path d={lane.d} strokeWidth={lane.thickness} />
            <path d={lane.d} strokeWidth={lane.thickness} transform={`translate(${-w} 0)`} />
            <path d={lane.d} strokeWidth={lane.thickness} transform={`translate(${w} 0)`} />
          </g>
        ))}
        {cols.map((col, i) => (
          <g key={`c${i}`}>
            <path d={col.d} strokeWidth={col.thickness} />
            <path d={col.d} strokeWidth={col.thickness} transform={`translate(${-w} 0)`} />
            <path d={col.d} strokeWidth={col.thickness} transform={`translate(${w} 0)`} />
          </g>
        ))}
      </g>
      <g fill={color} opacity={opacity * 0.55}>
        {wrapped.map((b, i) => (
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} />
        ))}
      </g>
    </pattern>
  )
}

function CausticLayer({ layerB }) {
  return (
    <g data-layer="caustic" aria-hidden="true" style={{ mixBlendMode: 'screen' }}>
      <defs>
        {/* Clip sebatas bentuk air — caustic tidak akan melimpah ke pasir,
            berapa pun gerakan translate/scale-nya. */}
        <clipPath id="hbWaterClip">
          <path d={WATER_PATH} />
        </clipPath>
      </defs>
      <CausticPattern id="hbCausticA" color="var(--caustic)" opacity={0.5} />
      {layerB && <CausticPattern id="hbCausticB" color="var(--caustic)" opacity={0.35} />}
      <g clipPath="url(#hbWaterClip)">
        <rect
          data-caustic-a
          x={-VB.w}
          y={0}
          width={VB.w * 3}
          height={FOAM_Y + 80}
          fill="url(#hbCausticA)"
          opacity="0.55"
        />
        {layerB && (
          <rect
            data-caustic-b
            x={-VB.w}
            y={0}
            width={VB.w * 3}
            height={FOAM_Y + 80}
            fill="url(#hbCausticB)"
            opacity="0.35"
          />
        )}
      </g>
    </g>
  )
}

/* ================================================================== *
 * LAYER: Kilau air (titik putih fade in-out)
 * ================================================================== */
function Glints({ points }) {
  return (
    <g data-layer="glints" aria-hidden="true" fill="#FFFFFF">
      {points.map((p, i) => (
        <circle key={i} data-glint cx={p.cx} cy={p.cy} r={p.r} opacity="0" />
      ))}
    </g>
  )
}

/* ================================================================== *
 * LAYER: Bintang laut (bentuk 5 lengan buatan sendiri)
 * ================================================================== */
function starfishPath(cx, cy, outer, inner) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`)
  }
  return `M${pts.join(' L')} Z`
}

function Starfish({ cx, cy, size, color, dark, spots, index }) {
  const rng = mulberry32(1000 + index * 7)
  const spotPts = Array.from({ length: spots }, () => {
    const a = rng() * Math.PI * 2
    const rr = rng() * size * 0.5
    return { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, r: 3 + rng() * 4 }
  })
  return (
    <g data-starfish data-origin={`${cx} ${cy}`} className="pointer-events-auto">
      {/* Bayangan tipis offset 3px */}
      <path d={starfishPath(cx + 3, cy + 3, size, size * 0.42)} fill="var(--sand-wet)" opacity="0.5" />
      {/* Lengan + isian */}
      <path d={starfishPath(cx, cy, size, size * 0.42)} fill={color} stroke={dark} strokeWidth="3" />
      {/* Bintik sun */}
      {spotPts.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--sun)" opacity="0.9" />
      ))}
    </g>
  )
}

function StarfishLayer({ items }) {
  return (
    <g data-layer="starfish" aria-hidden="true">
      {items.map((s, i) => (
        <Starfish key={s.id} {...s} index={i} />
      ))}
    </g>
  )
}

/* ================================================================== *
 * KOMPONEN UTAMA
 * ================================================================== */
export function HeroBeachScene({ onReady }) {
  const { quality } = useQuality()
  const scope = useRef(null)

  const animationsOn = quality !== 'off'
  const high = quality === 'high'

  /* Posisi deterministik (seed tetap) */
  const dots = useMemo(() => {
    const rng = mulberry32(42)
    return Array.from({ length: 90 }, () => ({
      cx: rng() * VB.w,
      cy: FOAM_Y + rng() * (VB.h - FOAM_Y),
      r: 2 + rng() * 4,
      o: 0.15 + rng() * 0.15,
    }))
  }, [])

  const glints = useMemo(() => {
    const rng = mulberry32(9)
    return Array.from({ length: SCENE.glints }, () => ({
      cx: rng() * VB.w,
      // Kilau air tetap di area air (di atas garis buih).
      cy: 40 + rng() * (FOAM_Y - 80),
      r: 2 + rng() * 3,
    }))
  }, [])

  // Blink-blink pasir: sebar di area pasir (bawah tepi air).
  const sparks = useMemo(() => {
    const rng = mulberry32(2718)
    return Array.from({ length: SCENE.sandSpark }, () => ({
      cx: rng() * VB.w,
      cy: FOAM_Y + 20 + rng() * (VB.h - FOAM_Y - 20),
      r: 1.5 + rng() * 3,
    }))
  }, [])

  const starfish = useMemo(() => {
    const rng = mulberry32(2024)
    const colors = [
      { color: 'var(--coral)', dark: '#E8623F', size: 58 },
      { color: 'var(--turquoise)', dark: '#1F9E92', size: 34 },
      { color: '#E8623F', dark: 'var(--coral)', size: 40 },
    ]
    return Array.from({ length: SCENE.starfish }, (_, i) => {
      const c = colors[i % colors.length]
      return {
        id: `sf-${i}`,
        cx: 260 + rng() * (VB.w - 520),
        cy: FOAM_Y + 60 + rng() * 150,
        spots: 6 + Math.round(rng() * 4),
        ...c,
      }
    })
  }, [])

  /* ---------------- Animasi ---------------- */
  useGSAP(
    () => {
      if (!animationsOn) {
        onReady?.()
        return
      }
      const root = scope.current
      if (!root) return

      const causticA = root.querySelector('[data-caustic-a]')
      const causticB = root.querySelector('[data-caustic-b]')
      const starfishEls = root.querySelectorAll('[data-starfish]')
      const glintEls = root.querySelectorAll('[data-glint]')
      const sparkEls = root.querySelectorAll('[data-spark]')
      const sand = root.querySelector('[data-layer="sand"]')
      const water = root.querySelector('[data-layer="water"]')
      const starfishGroup = root.querySelector('[data-layer="starfish"]')

      /* 1. Caustic */
      if (causticA && high) {
        gsap.fromTo(
          causticA,
          { x: -VB.w * 0.4, y: -40 },
          { x: 0, y: 40, duration: SCENE.causticADuration, ease: 'none', repeat: -1 }
        )
        gsap.to(causticA, {
          scale: 1.03,
          duration: SCENE.causticBreath,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 50%',
        })
      }
      if (causticB && high) {
        gsap.fromTo(
          causticB,
          { x: 0, y: 30 },
          { x: VB.w * 0.4, y: -30, duration: SCENE.causticBDuration, ease: 'none', repeat: -1 }
        )
      }

      /* 3. Kilau air */
      if (high && glintEls.length) {
        glintEls.forEach((g) => {
          gsap.to(g, {
            opacity: 0.8,
            duration: gsap.utils.random(SCENE.glintMin, SCENE.glintMax) / 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: gsap.utils.random(0, SCENE.glintMax),
          })
        })
      }

      /* 3b. Blink-blink pasir (kelip acak, hanya High) */
      if (high && sparkEls.length) {
        sparkEls.forEach((sp) => {
          gsap.to(sp, {
            opacity: gsap.utils.random(0.5, 0.95),
            duration: gsap.utils.random(SCENE.sparkMin, SCENE.sparkMax) / 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: gsap.utils.random(0, SCENE.sparkMax),
          })
        })
      }

      /* 4. Bintang laut: goyang halus + hover pegas */
      starfishEls.forEach((sf) => {
        gsap.to(sf, {
          rotation: gsap.utils.random(-SCENE.starfishWobble, SCENE.starfishWobble),
          duration: SCENE.starfishWobbleDuration,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          svgOrigin: sf.dataset.origin || undefined,
        })
      })
      if (high) {
        starfishEls.forEach((sf) => {
          const enter = () =>
            gsap.to(sf, { rotation: '+=12', duration: 0.8, ease: 'elastic.out(1, 0.4)' })
          const leave = () =>
            gsap.to(sf, { rotation: '-=12', duration: 0.6, ease: 'power2.out' })
          sf.addEventListener('mouseenter', enter)
          sf.addEventListener('mouseleave', leave)
          sf._cleanup = () => {
            sf.removeEventListener('mouseenter', enter)
            sf.removeEventListener('mouseleave', leave)
          }
        })
      }

      /* 5. Intro: kabari siap setelah preloader (scene statis, tanpa geser layer) */
      let introDone = false
      const playIntro = () => {
        if (introDone) return
        introDone = true
        gsap.delayedCall(SCENE.introRise, () => onReady?.())
      }

      // Tunggu sinyal preloader selesai (atau langsung bila tak ada).
      const waitStart = () => {
        if (!root.hasAttribute('data-preload-blocking')) {
          playIntro()
          return
        }
        const handler = () => playIntro()
        window.addEventListener('beach:preloader-done', handler, { once: true })
        // Jaring pengaman bila event tak datang.
        const safety = setTimeout(playIntro, 2600)
        root._introCleanup = () => {
          window.removeEventListener('beach:preloader-done', handler)
          clearTimeout(safety)
        }
      }
      waitStart()

      /* 6. Parallax scroll (scrub) */
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      if (sand) st.to(sand, { yPercent: SCENE.scrollSand, ease: 'none' }, 0)
      if (starfishGroup) st.to(starfishGroup, { yPercent: SCENE.scrollStarfish, ease: 'none' }, 0)

      /* 7. Parallax mouse (High, pointer halus) */
      if (high) {
        const fine = window.matchMedia('(pointer: fine)').matches
        if (fine) {
          const xSand = gsap.quickTo(sand, 'x', { duration: 0.6, ease: 'power3' })
          const ySand = gsap.quickTo(sand, 'y', { duration: 0.6, ease: 'power3' })
          const xWater = gsap.quickTo(water, 'x', { duration: 0.6, ease: 'power3' })
          const yWater = gsap.quickTo(water, 'y', { duration: 0.6, ease: 'power3' })
          const xSf = gsap.quickTo(starfishGroup, 'x', { duration: 0.6, ease: 'power3' })
          const ySf = gsap.quickTo(starfishGroup, 'y', { duration: 0.6, ease: 'power3' })
          const onMove = (e) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2
            const ny = (e.clientY / window.innerHeight - 0.5) * 2
            xSand(nx * SCENE.mouseSand)
            ySand(ny * SCENE.mouseSand)
            xWater(nx * SCENE.mouseWater)
            yWater(ny * SCENE.mouseWater)
            xSf(nx * SCENE.mouseStarfish)
            ySf(ny * SCENE.mouseStarfish)
          }
          window.addEventListener('mousemove', onMove)
          root._mouseCleanup = () => window.removeEventListener('mousemove', onMove)
        }
      }

      return () => {
        root._introCleanup?.()
        root._mouseCleanup?.()
        starfishEls.forEach((sf) => sf._cleanup?.())
      }
    },
    { scope, dependencies: [quality] }
  )

  /* Preload blocker: hanya saat preloader berpotensi tampil.
   * Preloader memakai sessionStorage 'beach-preloader-seen'. */
  const blocking = useMemo(() => {
    if (typeof window === 'undefined') return false
    try {
      if (window.sessionStorage.getItem('beach-preloader-seen')) return false
    } catch {
      return false
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
    return true
  }, [])

  return (
    <svg
      ref={scope}
      aria-hidden="true"
      className="hero-beach-scene pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', willChange: 'transform' }}
      {...(blocking ? { 'data-preload-blocking': '' } : {})}
    >
      <SandLayer dots={dots} sparks={sparks} />
      <WaterLayer />
      <CausticLayer layerB={high} />
      {high && <Glints points={glints} />}
      <StarfishLayer items={starfish} />
    </svg>
  )
}

export default HeroBeachScene
