import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    // ── navy-900: same as Projects — feels like one continuous dark ending ──
    <footer className="relative bg-navy-900 border-t border-mustard-600/15 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <a href="#hero" className="group relative">
            <span
              className="text-cream-50 text-xl md:text-2xl font-black tracking-wide transition-colors duration-300 group-hover:text-mustard-300"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hamza Haider
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-mustard-500 via-mustard-400 to-transparent"
              initial={{ width: '35%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </a>

          {/* Copyright */}
          <p className="text-cream-50/30 text-sm font-mono text-center">
            © {currentYear} Hamza Haider. Designed & Built with
            <span className="text-mustard-400"> ♥ </span>
            in Rawalpindi
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-mustard-600/25 text-mustard-400 flex items-center justify-center hover:border-mustard-400 hover:bg-mustard-400/10 transition-all duration-300"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer