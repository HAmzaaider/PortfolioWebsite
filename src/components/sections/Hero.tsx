import { lazy, Suspense } from 'react'
import { motion, type Variants } from 'framer-motion'
import useTypewriter from '@hooks/useTypewriter'

const FloatingGeometry = lazy(() => import('@components/3d/FloatingGeometry'))

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const lineVariants: Variants = {
  hidden:  { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 },
  },
}

// ─── Component ────────────────────────────────────────────────
const Hero = () => {
  const { displayText } = useTypewriter({
    words: [
      'Frontend Developer',
      'React Specialist',
      'UI/UX Enthusiast',
      'TypeScript Developer',
      '3D Web Creator',
    ],
    typeSpeed:     80,
    deleteSpeed:   50,
    pauseDuration: 2200,
  })

  return (
    <section
      id="hero"
      // ★ Hero = cream-50 (lightest) — first step of the alternating bg pattern
      className="relative w-full min-h-screen flex items-center overflow-x-hidden bg-cream-50"
    >
      {/* ── Subtle dot grid background ──────────────────────── */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #C96A00 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Large decorative background letter ──────────────── */}
      {/* Faint "H" behind everything for visual depth */}
      <div
        className="
          absolute right-0 top-1/2 -translate-y-1/2
          font-serif font-black text-[28vw] leading-none
          text-navy-800/[0.03] select-none pointer-events-none
          hidden lg:block
        "
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        H
      </div>

      {/* ── 3D Canvas — right half ───────────────────────────── */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full">
        <Suspense fallback={<div className="w-full h-full bg-cream-50" />}>
          <FloatingGeometry />
        </Suspense>
      </div>

      {/* ── Gradient fade — blends 3D scene into left content ── */}
      <div className="
        absolute inset-0
        bg-gradient-to-r
        from-cream-50 via-cream-50/95
        to-transparent
        lg:from-cream-50 lg:via-cream-50/80
      " />

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* ── Availability badge ────────────────────────────── */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="
              inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              bg-mustard-600/10 border border-mustard-600/30
              font-mono text-xs text-mustard-600
              font-semibold
            ">
              <span className="w-2 h-2 rounded-full bg-mustard-500 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* ── Greeting ──────────────────────────────────────── */}
          {/* ★ font-medium (was /60 opacity thin) for readability */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm font-medium text-navy-800/50 tracking-widest mb-4"
          >
            Hello, I'm
          </motion.p>

          {/* ── Main name heading — Playfair Display ─────────── */}
          <motion.h1
            variants={itemVariants}
            className="font-serif mb-2 leading-none"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {/* First name — large, bold, navy */}
            <span className="
              block text-[72px] md:text-[96px] font-black
              text-navy-800 tracking-tight
            ">
              Hamza
            </span>

            {/* Last name — italic, mustard gradient, slightly smaller */}
            <span className="
              block text-[64px] md:text-[84px] font-black italic
              text-gradient leading-none
            ">
              Haider.
            </span>
          </motion.h1>

          {/* ── Decorative divider line ───────────────────────── */}
          <motion.div
            variants={lineVariants}
            className="w-24 h-0.5 bg-mustard-600 mb-6 origin-left"
          />

          {/* ── Typewriter role ───────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6 h-9"
          >
            {/* ★ font-medium instead of default thin for typewriter text */}
            <span className="font-mono text-lg md:text-xl font-medium text-navy-800/65">
              {displayText}
            </span>

            {/* Blinking cursor */}
            <span className="w-0.5 h-5 bg-mustard-600 animate-pulse" />
          </motion.div>

          {/* ── Bio ───────────────────────────────────────────── */}
          {/* ★ Changed font-light → font-normal for legibility on cream bg */}
          <motion.p
            variants={itemVariants}
            className="
              text-navy-800/70 text-base md:text-lg
              leading-relaxed max-w-lg mb-10
              font-normal
            "
          >
            I craft high-performance, visually stunning web experiences
            using modern technologies. Passionate about clean code,
            smooth animations, and pixel-perfect design.
          </motion.p>

          {/* ── CTA Buttons ───────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            {/* Primary — solid mustard */}
            <a
              href="#projects"
              className="
                group relative inline-flex items-center justify-center
                px-8 py-4 rounded-md overflow-hidden
                bg-mustard-600 text-white
                font-semibold text-sm tracking-wide
                hover:bg-mustard-500
                transition-all duration-300
                shadow-[0_4px_20px_rgba(201,106,0,0.3)]
                hover:shadow-[0_6px_28px_rgba(201,106,0,0.5)]
              "
            >
              {/* Shine sweep on hover */}
              <span className="
                absolute inset-0 bg-white/20
                translate-x-[-110%] group-hover:translate-x-[110%]
                transition-transform duration-500 skew-x-12
              " />
              View My Work
            </a>

            {/* Secondary — navy outline */}
            <a
              href="#contact"
              className="
                inline-flex items-center justify-center
                px-8 py-4 rounded-md
                border-2 border-navy-800 text-navy-800
                font-semibold text-sm tracking-wide
                hover:bg-navy-800 hover:text-white
                transition-all duration-300
              "
            >
              Get In Touch
            </a>
          </motion.div>

          {/* ── Social Links ──────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            <span className="font-mono text-xs font-semibold text-navy-800/40 tracking-widest">
              FIND ME
            </span>

            <div className="h-px w-10 bg-mustard-600/30" />

            {/* GitHub */}
            <a
              href="https://github.com/HAmzaaider"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2
                text-navy-800/60 hover:text-navy-800
                text-sm font-mono font-medium
                transition-colors duration-300
                group
              "
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="group-hover:text-mustard-600 transition-colors duration-300">
                GitHub
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/hamza-haider-6b8063318"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2
                text-navy-800/60 hover:text-navy-800
                text-sm font-mono font-medium
                transition-colors duration-300
                group
              "
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
              <span className="group-hover:text-mustard-600 transition-colors duration-300">
                LinkedIn
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="
          absolute bottom-10 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2
        "
      >
        <span className="font-mono text-xs font-semibold text-navy-800/30 tracking-widest">
          SCROLL
        </span>

        {/* Mouse scroll icon */}
        <div className="
          w-6 h-10 rounded-full
          border-2 border-mustard-600/40
          flex items-start justify-center p-1.5
        ">
          <motion.div
            animate={{ y: [0,14,0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-mustard-600 rounded-full"
          />
        </div>
      </motion.div>

      {/* ★ Section divider — diagonal cut into About (cream-100 = #FEE8A0) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-12 block">
          <path d="M0,50 L1440,0 L1440,50 Z" fill="#FEE8A0" />
        </svg>
      </div>
    </section>
  )
}

export default Hero