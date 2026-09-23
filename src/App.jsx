import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QualityContext, useQualityProvider } from './hooks/useQuality'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { DockNav } from './components/layout/DockNav'
import { Preloader } from './components/effects/Preloader'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { NotFound } from './pages/NotFound'

// Reset posisi scroll saat pindah route (kecuali ada hash tujuan).
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

// Dock hanya di halaman home (section-nya ada di sana).
function Shell() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <>
      <Preloader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isHome && <DockNav />}
    </>
  )
}

function App() {
  const quality = useQualityProvider()
  return (
    <QualityContext.Provider value={quality}>
      <SmoothScroll>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </SmoothScroll>
    </QualityContext.Provider>
  )
}

export default App
