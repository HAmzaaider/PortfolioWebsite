import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────
interface NavLink {
  label: string
  href:  string
}

// ─── Data ─────────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

// ─── Animation Variants ───────────────────────────────────────
// Logo slides in from the left
const logoVariants: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// Nav links stagger in from the top one by one
const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

const navLinkVariants: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// Resume button slides in from the right
const resumeVariants: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 },
  },
}

// ─── Component ────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled,  setScrolled]  = useState<boolean>(false)
  const [menuOpen,  setMenuOpen]  = useState<boolean>(false)

  const [activeLink, setActiveLink] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink(`#${id}`)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${scrolled
          ? 'bg-cream-50/95 backdrop-blur-md border-b-2 border-mustard-600/20 py-3 shadow-[0_4px_24px_rgba(201,106,0,0.10)]'
          : 'bg-cream-50/60 backdrop-blur-sm border-b border-mustard-600/10 py-5'
        }`}>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo — slides in from left ──────────────────── */}
          <motion.a
            href="#hero"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="group flex items-center gap-1"
          >
            <motion.span className="text-mustard-600 font-mono text-xl font-bold">
              &lt;
            </motion.span>

            <span className="text-navy-800 font-bold text-xl group-hover:text-mustard-600 transition-colors duration-300">
              Hamza Haider
            </span>

            <motion.span className="text-mustard-600 font-mono text-xl font-bold">
              /&gt;
            </motion.span>
          </motion.a>

          {/* ── Desktop Links — FIXED HERE ─────────── */}
          <motion.ul
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <motion.li key={link.href} variants={navLinkVariants}>

                {/* ✅ FIX: Missing <a> tag */}
                <a
                  href={link.href}
                  className={`relative font-semibold text-[15px] transition-colors duration-300 group
                    ${activeLink === link.href
                      ? 'text-mustard-600'
                      : 'text-navy-800/70 hover:text-mustard-600'
                    }`}
                >
                  {link.label}

                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-mustard-600 rounded-full transition-all duration-300
                    ${activeLink === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />

                  {activeLink === link.href && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-mustard-600"
                    />
                  )}
                </a>

              </motion.li>
            ))}
          </motion.ul>

          {/* ── Resume Button — FIXED HERE ─────────── */}
          <motion.div variants={resumeVariants} initial="hidden" animate="visible" className="hidden md:block">

            {/* ✅ FIX: Missing <a> tag */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-md overflow-hidden border-2 border-navy-800 text-navy-800 text-sm font-mono font-semibold hover:text-white transition-colors duration-300 group"
            >
              <span className="absolute inset-0 bg-navy-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Resume</span>
            </a>

          </motion.div>

          {/* ── Mobile Hamburger ─────────────────────────────── */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-0.5 bg-mustard-600 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-mustard-600 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-mustard-600 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </motion.button>

        </div>
      </nav>

      {/* ── Mobile Drawer (already correct) ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 bg-cream-50 flex flex-col items-center justify-center gap-8 md:hidden">

            {NAV_LINKS.map((link) => (
              <motion.a key={link.href} href={link.href} onClick={handleLinkClick}>
                {link.label}
              </motion.a>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar