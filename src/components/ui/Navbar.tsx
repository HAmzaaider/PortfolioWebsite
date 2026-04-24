import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// ─── Animation Variants ───────────────────────────────────────
const logoVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.35,
    },
  },
};

const navLinkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const resumeVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.65,
    },
  },
};

// ─── Component ────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Ref to track the nav list width for the sliding pill
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [...NAV_LINKS].map((l) => l.href.replace("#", ""));

      for (const id of sections.reverse()) {
        const el = document.getElementById(id);

        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveLink(`#${id}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500
          ${
            scrolled
              ? "bg-cream-50/96 backdrop-blur-xl py-3 shadow-[0_4px_32px_rgba(201,106,0,0.12)]"
              : "bg-cream-50/70 backdrop-blur-sm py-5"
          }
        `}
      >
        {/* ── Thin mustard line at very bottom of navbar ───── */}
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-mustard-600/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* ── Logo ──────────────────────────────────────── */}
          <motion.a
            href="#hero"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="group flex items-center select-none"
          >
            <span
              className="text-navy-800 font-bold text-xl tracking-tight group-hover:text-mustard-600 transition-colors duration-300"
              style={{
                fontFamily: "Playfair Display, serif",
              }}
            >
              Hamza Haider
            </span>
          </motion.a>

          {/* ── Desktop Nav Links ──────────────────────────── */}
          <motion.ul
            ref={navRef}
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-1 relative"
          >
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.href}
                variants={navLinkVariants}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {/* ── Sliding hover background pill ─────────── */}
                {/* Uses layoutId so it smoothly slides between links */}
                {hoveredLink === link.href && (
                  <motion.div
                    layoutId="nav-hover-bg"
                    className="absolute inset-0 bg-mustard-600/10 rounded-lg -z-10"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                <a
                  href={link.href}
                  className={`
                    relative flex items-center px-4 py-2 rounded-lg
                    font-semibold text-base
                    transition-colors duration-200
                    ${
                      activeLink === link.href
                        ? "text-mustard-600"
                        : "text-navy-800/70 hover:text-mustard-600"
                    }
                  `}
                >
                  {link.label}

                  {/* ── Active underline ──────────────────────── */}
                  <motion.span
                    className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-mustard-600 rounded-full"
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: activeLink === link.href ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    style={{
                      originX: 0.5,
                    }}
                  />

                  {/* ── Active dot below ──────────────────────── */}
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-mustard-600"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* ── Resume Button ──────────────────────────────── */}
          <motion.div
            variants={resumeVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:block"
          >
            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="
                relative inline-flex items-center gap-2
                px-5 py-2.5 rounded-lg overflow-hidden
                border-2 border-navy-800 text-navy-800
                text-base font-mono font-bold
                hover:text-cream-50
                transition-colors duration-300
                group
              "
            >
              {/* Fill sweeps up from bottom on hover */}
              <span
                className="
                  absolute inset-0 bg-navy-800
                  translate-y-full group-hover:translate-y-0
                  transition-transform duration-300
                "
              />

              <span className="relative z-10">Resume</span>

              <svg
                className="relative z-10 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </motion.div>

          {/* ── Mobile Hamburger ───────────────────────────── */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[2px] bg-mustard-600 rounded-full"
                style={{
                  width: i === 1 ? 18 : 24,
                }}
              />
            ))}
          </motion.button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Drawer ──────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0 z-40
              bg-cream-50
              flex flex-col items-center justify-center
              gap-6 md:hidden
            "
          >
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-black text-navy-800"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="/resume.pdf"
              download="resume.pdf"
              className="
                mt-6 px-10 py-3.5 rounded-xl
                bg-mustard-600 text-white
              "
            >
              Resume ↓
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
