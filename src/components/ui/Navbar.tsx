import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────
interface NavLink {
  label: string
  href: string
}

// ─── Data ─────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// ─── Component ────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu after clicking link
  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${
            scrolled
              ? 'bg-[#080E10]/80 backdrop-blur-md border-b border-[#00CFAD]/10 py-3'
              : 'bg-transparent py-5'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

         {/* Logo */}
         <a href="#hero" className="group">
         <span className="text-white font-bold text-lg tracking-wide group-hover:text-[#00CFAD] transition-colors duration-300">
          Hamza Haider
         </span>
         </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="
                    relative text-sm text-[#6B9E94] font-medium
                    hover:text-[#00CFAD] transition-colors duration-300
                    group
                  "
                >
                  {link.label}

                  <span
                    className="
                      absolute -bottom-1 left-0 w-0 h-[1px]
                      bg-[#00CFAD]
                      group-hover:w-full
                      transition-all duration-300
                    "
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden md:inline-flex items-center gap-2
              px-4 py-2 rounded-md
              border border-[#00CFAD] text-[#00CFAD]
              text-sm font-medium font-mono
              hover:bg-[#00CFAD] hover:text-[#080E10]
              transition-all duration-300
            "
          >
            Resume
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`
                block w-6 h-0.5 bg-[#00CFAD]
                transition-all duration-300
                ${menuOpen ? 'rotate-45 translate-y-2' : ''}
              `}
            />

            <span
              className={`
                block w-6 h-0.5 bg-[#00CFAD]
                transition-all duration-300
                ${menuOpen ? 'opacity-0 w-0' : ''}
              `}
            />

            <span
              className={`
                block w-6 h-0.5 bg-[#00CFAD]
                transition-all duration-300
                ${menuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}
            />
          </button>

        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="
              fixed inset-0 z-40
              bg-[#080E10]/95 backdrop-blur-lg
              flex flex-col items-center justify-center
              gap-10 md:hidden
            "
          >
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.3
                }}
                className="text-3xl font-bold text-white hover:text-[#00CFAD] transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: NAV_LINKS.length * 0.08,
                duration: 0.3
              }}
              className="
                px-8 py-3 rounded-md mt-4
                border border-[#00CFAD] text-[#00CFAD]
                text-lg font-mono font-medium
                hover:bg-[#00CFAD] hover:text-[#080E10]
                transition-all duration-300
              "
            >
              Resume
            </motion.a>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar