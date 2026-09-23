import { useEffect, useRef, useState } from 'react'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'
import { DataIcon } from '../ui/DataIcon'
import { skills, techBadges } from '../../data/skills'
import { useQuality } from '../../hooks/useQuality'

// Section Skill (DESAIN.md 6.3).
// Infinite marquee badge di atas garis gelombang (wave) putus-putus. PRD A7.
//
// Cara kerja:
// - SATU set = semua badge berjajar, tiap badge lebar tetap + gap tetap.
// - Set digambar DUA KALI berdampingan di dalam satu track flex.
// - Track digeser kontinu ke kiri (translateX). Begitu geseran mencapai
//   tepat lebar SATU set, posisi di-reset ke 0 secara instan. Karena set
//   kedua identik dan sudah menempati posisi set pertama, reset ini tidak
//   terlihat -> loop seamless, tanpa pop-in / gap.
// - Posisi Y setiap badge dihitung TIAP FRAME dari fungsi sine yang PERSIS
//   sama dengan fungsi yang dipakai menggambar garis SVG, jadi badge selalu
//   duduk tepat di atas garis gelombang.
//
// Fallback (DESAIN.md 6.3 & 11): daftar teknologi tetap tersedia sebagai teks
// biasa di kartu kategori, sehingga konten tidak bergantung pada animasi.

const TRACK_H = 120 // tinggi track (px)
const AMP = 22 // amplitudo gelombang (px) — moderate, tetap landai
const MID = TRACK_H / 2 // baseline (garis tengah) gelombang
const TARGET_WAVELEN = 520 // panjang gelombang penuh NOMINAL; disesuaikan agar pas n siklus / set
const PHASE = 0 // fase gelombang (radian); dipakai SAMA oleh garis & badge
const GAP = 28 // jarak antar badge (px) — konsisten & ikut dihitung di lebar set
const COPIES = 2 // dua set berdampingan untuk loop seamless
const SPEED = 60 // kecepatan aliran (px/detik)

// Panjang gelombang final: dibuat supaya lebar SATU set = bilangan bulat kali
// gelombang -> saat track di-reset dari -setWidth ke 0, fase gelombang kontinu
// (tidak ada lompatan pada badge) dan garis statis tetap sinkron.
function calcWavelength(setWidth) {
  if (!setWidth) return TARGET_WAVELEN
  const cycles = Math.max(1, Math.round(setWidth / TARGET_WAVELEN))
  return setWidth / cycles
}

// Fungsi gelombang tunggal — sumber kebenaran untuk garis MAUPUN posisi badge.
// y = amplitude * sin((x / wavelength) * 2π + phase) + baseline
function waveY(x, wavelength) {
  return Math.sin((x / wavelength) * 2 * Math.PI + PHASE) * AMP + MID
}

// Bangun `d` path SVG dari fungsi gelombang yang sama, selebar `width`.
function buildWavePath(width, wavelength) {
  const step = 8
  let d = `M0,${waveY(0, wavelength).toFixed(2)}`
  for (let x = step; x <= width; x += step) {
    d += ` L${x},${waveY(x, wavelength).toFixed(2)}`
  }
  return d
}

const CHIP_BG = {
  turquoise: 'bg-turquoise',
  sun: 'bg-sun',
  shallow: 'bg-shallow',
  sky: 'bg-sky',
  coral: 'bg-coral',
}

export function Skills() {
  const { quality } = useQuality()
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const rafRef = useRef(0)
  const animationsOn = quality !== 'off'

  // High: semua badge. Low: setengah. Off: tidak ada track animasi.
  const badges = quality === 'high' ? techBadges : techBadges.slice(0, 4)

  const [wrapWidth, setWrapWidth] = useState(1200)
  const [setWidth, setSetWidth] = useState(0)

  // Jumlah salinan set: minimal 2, dan CUKUP banyak agar total track selalu
  // lebih lebar dari wrapper (kalau tidak, akan terlihat celah/gap saat loop).
  // Dibulatkan ke atas + 1 cadangan.
  const copies =
    setWidth > 0
      ? Math.max(COPIES, Math.ceil(wrapWidth / setWidth) + 1)
      : COPIES

  // Ukur lebar wrapper (agar path garis menutupi layar).
  useEffect(() => {
    const el = wrapRef.current
    if (!el || !animationsOn) return
    const update = () => setWrapWidth(el.clientWidth || 1200)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [animationsOn])

  // Ukur lebar SATU set + posisi X lokal tiap badge (di dalam set), supaya:
  // - reset translateX tepat pada batas set (seamless), dan
  // - posisi Y tiap badge dihitung dari X-nya yang sebenarnya.
  useEffect(() => {
    const el = trackRef.current
    if (!el || !animationsOn) return
    const measure = () => {
      const setEls = el.querySelectorAll('[data-set]')
      if (!setEls.length) return
      const first = setEls[0].getBoundingClientRect()
      // Stride = jarak dari awal set-1 ke awal set-2 (termasuk gap antar-set).
      // Ini lebar yang harus dipakai untuk modulus translateX, agar reset dari
      // -stride ke 0 tepat bertumpuk (seamless tanpa lompatan).
      const second = setEls[1]?.getBoundingClientRect()
      setSetWidth(second ? second.left - first.left : first.width)

      // Ambil geometri badge dari set PERTAMA (relatif awal set). Karena tiap
      // set identik, badge di set mana pun memakai localX yang sama -> semua
      // berada pada fase gelombang yang sama.
      const nodes = Array.from(el.querySelectorAll('[data-set] [data-badge]'))
      const perSet = badges.length || 1
      nodes.forEach((node, idx) => {
        const src = nodes[idx % perSet] || node
        const rect = src.getBoundingClientRect()
        const setRect = src.parentElement.getBoundingClientRect()
        node.dataset.localx = String(rect.left - setRect.left + rect.width / 2)
      })
      itemRefs.current = nodes
    }
    measure()
    // Ukur ulang setelah layout/font/ikon stabil.
    const raf = requestAnimationFrame(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [animationsOn, badges.length, copies])

  // Animasi: geser track via rAF, tulis translateX + posisi Y tiap badge.
  useEffect(() => {
    if (!animationsOn || !setWidth) return
    const track = trackRef.current
    if (!track) return

    const wavelength = calcWavelength(setWidth)
    let offset = 0
    let last = performance.now()

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000) // clamp saat tab tak aktif
      last = now
      offset = (offset + SPEED * dt) % setWidth // geser kontinu & loop mulus
      track.style.transform = `translate3d(${-offset}px, 0, 0)`

      // Posisi Y tiap badge mengikuti gelombang yang SAMA dengan garis statis.
      // X layar badge = localX - offset (track bergeser ke kiri). Karena lebar
      // set = bilangan bulat kali gelombang, saat offset reset 0 -> setWidth
      // fase tetap kontinu, jadi tidak ada lompatan.
      const refs = itemRefs.current
      for (let i = 0; i < refs.length; i++) {
        const node = refs[i]
        if (!node) continue
        const localX = node.dataset.localx ? Number(node.dataset.localx) : 0
        const y = waveY(localX - offset, wavelength)
        node.style.transform = `translateY(${(y - MID).toFixed(2)}px)`
      }
      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animationsOn, setWidth])

  // Lebar path garis = lebar wrapper (skala 1:1, tanpa peregangan), supaya
  // fungsi gelombang garis PERSIS sama (amplitude/period/fase) dengan yang
  // dipakai menghitung posisi Y badge. Sedikit dilebihkan untuk keamanan.
  const wavelength = calcWavelength(setWidth)
  const pathWidth = Math.max(wrapWidth, 320)
  const waveD = buildWavePath(pathWidth, wavelength)

  return (
    <section id="skills" className="relative px-6 py-20 md:py-[120px]">
      <div className="mx-auto max-w-container">
        <div className="text-center">
          <SectionTitle>My Tech Stack</SectionTitle>
          <p className="text-body mx-auto mt-3 max-w-prose text-[17px] leading-[1.65]">
            Tools I reach for most, grouped by what I use them for.
          </p>
        </div>

        {/* Garis gelombang statis + badge mengalir di atasnya (marquee). */}
        {animationsOn && (
          <div
            ref={wrapRef}
            aria-hidden="true"
            className="relative mt-12 hidden overflow-hidden md:block"
            style={{ height: `${TRACK_H}px` }}
          >
            {/* Garis dashed statis, memakai fungsi gelombang yang sama */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${pathWidth} ${TRACK_H}`}
              preserveAspectRatio="none"
            >
              <path
                d={waveD}
                fill="none"
                stroke="var(--turquoise)"
                strokeWidth="2"
                strokeDasharray="6 10"
              />
            </svg>

            {/* Track: dua set identik berdampingan; digeser lalu reset di batas set */}
            <div
              ref={trackRef}
              className="absolute left-0 top-0 flex items-center will-change-transform"
              style={{ height: `${TRACK_H}px`, gap: `${GAP}px` }}
            >
              {Array.from({ length: copies }, (_, copy) => (
                <div
                  key={copy}
                  data-set=""
                  className="flex shrink-0 items-center"
                  style={{ gap: `${GAP}px` }}
                >
                  {badges.map((badge) => (
                    <span
                      key={`${copy}-${badge.name}`}
                      data-badge
                      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-ocean shadow-[var(--shadow-sm)] ${
                        CHIP_BG[badge.tint] || CHIP_BG.shallow
                      }`}
                    >
                      <DataIcon name={badge.icon} size={16} />
                      {badge.name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kartu kategori (daftar teknologi sebagai teks biasa — fallback aksesibilitas) */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <GlassCard key={group.category} className="p-6">
              <h3 className="text-[22px] font-bold text-ocean md:text-[28px]">{group.category}</h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 text-[15px] text-ocean/85">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-shallow text-ocean">
                      <DataIcon name={item.icon} size={16} />
                    </span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
