import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-cream-100 border-t border-navy-800/8 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-1">
            <motion.span
              className="text-mustard-600 font-mono text-xl font-bold"
              whileHover={{ rotate: -15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              &lt;
            </motion.span>
            <span
              className="text-navy-800 font-bold text-lg group-hover:text-mustard-600 transition-colors duration-300"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hamza Haider
            </span>
            <motion.span
              className="text-mustard-600 font-mono text-xl font-bold"
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              /&gt;
            </motion.span>
          </a>

          {/* Copyright */}
          <p className="text-navy-800/40 text-sm font-mono text-center">
            © {currentYear} Hamza Haider. Designed & Built with
            <span className="text-mustard-600"> ♥ </span>
            in Rawalpindi
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-10 h-10 rounded-full
              border-2 border-navy-800/15 text-navy-800/40
              flex items-center justify-center
              hover:border-mustard-600 hover:text-mustard-600
              transition-all duration-300
            "
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