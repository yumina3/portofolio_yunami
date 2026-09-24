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
import { useLenis } from '../hooks/useLenis'
import { scrollToSection } from '../utils/scrollToSection'

// Home: tujuh section dalam satu halaman (PRD bagian 5).
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
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Wall />
        <Contact />
      </main>
    </>
  )
}
