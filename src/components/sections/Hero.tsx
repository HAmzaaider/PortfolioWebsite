import { lazy, Suspense } from 'react'
import { motion, type Variants } from 'framer-motion'
import useTypewriter from '@hooks/useTypewriter'
import SectionBorder from '@components/ui/SectionBorder'

const FloatingGeometry = lazy(() => import('@components/3d/FloatingGeometry'))

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

const Hero = () => {
  const { displayText } = useTypewriter({
    words: [
      'Frontend Developer',
      'React Specialist',
      'UI/UX Enthusiast',
      'TypeScript Developer',
      '3D Web Creator',
    ],
    typeSpeed: 80, deleteSpeed: 50, pauseDuration: 2200,
  })

  return (
    // ── cream-50: lightest section ────────────────────────────
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-cream-50"
    >
      {/* Animated border at top */}
      <SectionBorder isInView={true} theme="light" delay={1.2} />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #C96A00 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Faint decorative letter */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[28vw] font-black leading-none text-navy-800/[0.03] select-none pointer-events-none hidden lg:block"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        H
      </div>

      {/* 3D Canvas */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full">
        <Suspense fallback={<div className="w-full h-full bg-cream-50" />}>
          <FloatingGeometry />
        </Suspense>
      </div>

      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-cream-50/95 to-transparent lg:via-cream-50/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mustard-600/10 border border-mustard-600/30 font-mono text-sm text-mustard-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-mustard-500 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={itemVariants} className="font-mono text-base font-semibold text-navy-800/50 tracking-widest mb-4">
            Hello, I'm
          </motion.p>

          {/* Name — Rule applied: gradient in isolated span */}
          <motion.h1
            variants={itemVariants}
            className="font-serif mb-3 leading-none"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <span className="block text-[72px] md:text-[96px] font-black text-navy-800 tracking-tight">
              Hamza
            </span>
            {/* Rule 2 & 3: gradient isolated in its own element */}
            <span className="block text-[64px] md:text-[84px] font-black italic leading-none">
              <span className="text-gradient inline-block">Haider.</span>
            </span>
          </motion.h1>

          {/* Divider line */}
          <motion.div variants={lineVariants} className="w-24 h-[3px] bg-mustard-600 rounded-full mb-6 origin-left" />

          {/* Typewriter */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 h-10">
            <span className="font-mono text-xl font-semibold text-navy-800/65">
              {displayText}
            </span>
            <span className="w-[2px] h-6 bg-mustard-600 animate-pulse rounded-full" />
          </motion.div>

          {/* Bio */}
          <motion.p variants={itemVariants} className="text-navy-800/70 text-lg leading-relaxed max-w-lg mb-10 font-normal">
            I craft high-performance, visually stunning web experiences using modern technologies.
            Passionate about clean code, smooth animations, and pixel-perfect design.
          </motion.p>

          {/* CTAs — light bg buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#projects" className="btn-light-primary group relative overflow-hidden">
              <span className="absolute inset-0 bg-white/25 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-12 pointer-events-none" />
              <span className="relative z-10">View My Work</span>
            </a>
            <a href="#contact" className="btn-light-secondary">
              Get In Touch
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <span className="font-mono text-sm font-semibold text-navy-800/40 tracking-widest">FIND ME</span>
            <div className="h-px w-10 bg-mustard-600/30" />

            <a href="https://github.com/HAmzaaider" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-navy-800/60 hover:text-mustard-600 text-base font-mono font-semibold transition-colors duration-300 group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>

            <a href="https://www.linkedin.com/in/hamza-haider-6b8063318" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-navy-800/60 hover:text-mustard-600 text-base font-mono font-semibold transition-colors duration-300 group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs font-semibold text-navy-800/30 tracking-widest">SCROLL</span>
        <div className="w-6 h-10 rounded-full border-2 border-mustard-600/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-mustard-600 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero