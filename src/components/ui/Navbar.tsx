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

  // Track which link is currently active based on scroll position
  const [activeLink, setActiveLink] = useState<string>('')

  // ── Scroll listener ───────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine which section is in view
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
      {/* ── Main Navbar ───────────────────────────────────── */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500
          ${scrolled
            ? 'bg-cream-50/92 backdrop-blur-md border-b border-mustard-600/10 py-3 shadow-sm'
            : 'bg-transparent py-5'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo — slides in from left ──────────────────── */}
          <motion.a
            href="#hero"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="group flex items-center gap-1"
          >
            {/* Opening bracket animates color on hover */}
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
          </motion.a>

          {/* ── Desktop Links — stagger in from top ─────────── */}
          <motion.ul
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <motion.li key={link.href} variants={navLinkVariants}>
                
                {/* FIXED: missing opening anchor */}
                <a
                  href={link.href}
                  className={`
                    relative text-sm font-medium
                    transition-colors duration-300 group
                    ${activeLink === link.href
                      ? 'text-mustard-600'
                      : 'text-navy-800/60 hover:text-mustard-600'
                    }
                  `}
                >
                  {link.label}

                  {/* Active/hover underline */}
                  <span className={`
                    absolute -bottom-1 left-0 h-[1.5px]
                    bg-mustard-600 rounded-full
                    transition-all duration-300
                    ${activeLink === link.href ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} />

                  {/* Active dot indicator below link */}
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

          {/* ── Resume Button — slides in from right ─────────── */}
          <motion.div
            variants={resumeVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:block"
          >

            {/* FIXED: missing opening anchor */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative inline-flex items-center gap-2
                px-5 py-2 rounded-md overflow-hidden
                border-2 border-navy-800 text-navy-800
                text-sm font-mono font-medium
                hover:text-white
                transition-colors duration-300
                group
              "
            >
              {/* Fill background slides up on hover */}
              <span className="
                absolute inset-0 bg-navy-800
                translate-y-full group-hover:translate-y-0
                transition-transform duration-300
              " />
              <span className="relative z-10">Resume</span>

              {/* Animated arrow icon */}
              <svg
                className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </motion.div>

          {/* ── Mobile Hamburger ─────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle mobile menu"
          >
            <span className={`
              block w-6 h-0.5 bg-mustard-600 rounded-full
              transition-all duration-300 origin-center
              ${menuOpen ? 'rotate-45 translate-y-2' : ''}
            `} />
            <span className={`
              block w-6 h-0.5 bg-mustard-600 rounded-full
              transition-all duration-300
              ${menuOpen ? 'opacity-0 scale-x-0' : ''}
            `} />
            <span className={`
              block w-6 h-0.5 bg-mustard-600 rounded-full
              transition-all duration-300 origin-center
              ${menuOpen ? '-rotate-45 -translate-y-2' : ''}
            `} />
          </motion.button>

        </div>

        {/* ── Animated progress line at bottom of navbar ─────── */}
        {/* Grows from left on scroll, shows page reading progress */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left bg-mustard-600/20"
          />
        )}
      </nav>

      {/* ── Mobile Full-Screen Drawer ─────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="
              fixed inset-0 z-40
              bg-cream-50
              flex flex-col items-center justify-center
              gap-8 md:hidden
            "
          >
            {/* Decorative background letter */}
            <div
              className="absolute text-[40vw] font-black text-navy-800/[0.03] select-none pointer-events-none"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              H
            </div>

            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
                className="
                  text-4xl font-black text-navy-800
                  hover:text-mustard-600
                  transition-colors duration-300
                  relative group
                "
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {link.label}

                {/* Underline on hover */}
                <span className="
                  absolute -bottom-1 left-0 w-0 h-0.5
                  bg-mustard-600 group-hover:w-full
                  transition-all duration-300
                " />
              </motion.a>
            ))}

            {/* Resume in mobile drawer */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV_LINKS.length * 0.07, duration: 0.4 }}
              className="
                mt-4 px-10 py-3 rounded-md
                bg-mustard-600 text-white
                text-lg font-mono font-semibold
                hover:bg-mustard-500
                transition-all duration-300
              "
            >
              Resume ↓
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar