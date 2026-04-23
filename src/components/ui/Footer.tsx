import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Smooth scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#080E10] border-t border-[#00CFAD]/10 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* ── Logo ──────────────────────────────────────── */}
          <a href="#hero" className="group flex items-center gap-2">
          <span className="text-white font-bold text-lg group-hover:text-[#00CFAD] transition-colors duration-300">
           Hamza Haider
           </span>
           </a>

          {/* ── Copyright ─────────────────────────────────── */}
          <p className="text-[#6B9E94] text-sm font-mono text-center">
            © {currentYear} Hamza Haider. Designed & Built with
            <span className="text-[#00CFAD]"> ♥ </span>
            in Rawalpindi
          </p>

          {/* ── Back to top button ────────────────────────── */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-10 h-10 rounded-full
              border border-[#00CFAD]/25 text-[#00CFAD]
              flex items-center justify-center
              hover:bg-[#00CFAD] hover:text-[#080E10]
              transition-all duration-300
            "
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>

        </div>
      </div>
    </footer>
  )
}

export default Footer