import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Skills } from '../components/sections/Skills'
import { Experience } from '../components/sections/Experience'
import { Projects } from '../components/sections/Projects'
import { Wall } from '../components/sections/Wall'
import { Contact } from '../components/sections/Contact'
import { SkyBackground } from '../components/effects/SkyBackground'
import { WaveTransition } from '../components/effects/WaveTransition'
import { useLenis } from '../hooks/useLenis'
import { scrollToSection } from '../utils/scrollToSection'

// Home: tujuh section dalam satu halaman (PRD bagian 5).
// Zona transisi ombak dipasang di antara pergantian act (DESAIN.md 8.3).
export function Home() {
  const lenis = useLenis()
  const location = useLocation()

  // Dukung tautan seperti /#projects (dipakai tombol "Back to projects").
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    scrollToSection(el, lenis)
  }, [location.hash, lenis])

  return (
    <>
      <SkyBackground />
      <main className="pb-28">
        <Hero />
        <WaveTransition nextFill="var(--sky)" />
        <About />
        <Skills />
        <Experience />
        <WaveTransition nextFill="var(--shallow)" />
        <Projects />
        {/* Transisi Projects -> Wall: blend dari navy gelap ke biru laut (bukan kuning). */}
        <WaveTransition prevFill="#071E33" nextFill="#2C7FA6" />
        <Wall />
        <WaveTransition nextFill="var(--ocean)" />
        <Contact />
      </main>
    </>
  )
}
