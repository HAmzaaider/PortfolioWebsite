import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'


// Layout components (always visible)
import Navbar from '@components/ui/Navbar'
import CustomCursor from '@components/ui/CustomCursor'

// Page sections (each is a full section of the single page)
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import Skills from '@components/sections/Skills'
import Projects from '@components/sections/Projects'
import Experience from '@components/sections/Experience'
import Contact from '@components/sections/Contact'
import Footer from '@components/ui/Footer'
import ScrollProgress from '@components/ui/ScrollProgress'

function App() {
  return (
    // HelmetProvider allows child components to set <head> meta tags (SEO)
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

// MainPage assembles all sections in order
// Each section is a full-height (or content-height) block
function MainPage() {
  return (
    // <main className="relative bg-[#080E10] overflow-x-hidden">
    <main className="relative bg-cream-50 overflow-x-hidden">

      {/* Custom animated cursor — sits on top of everything */}
      <CustomCursor />
      
      <ScrollProgress />
      {/* Sticky navigation bar */}
      <Navbar />

      {/* ─── Page Sections ─────────────────────────── */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      {/* ────────────────────────────────────────────── */}

      <Footer />
    </main>
  )
}

export default App