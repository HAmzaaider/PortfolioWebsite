import { motion, type Variants } from 'framer-motion'
import { lazy, Suspense } from 'react'
import useTypewriter from '@hooks/useTypewriter'

const ParticleScene = lazy(() => import('@components/3d/ParticleScene'))
// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1], // cubic bezier instead of string "easeOut"
    },
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
    typeSpeed: 80,
    deleteSpeed: 50,
    pauseDuration: 2000,
  })

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center overflow-hidden bg-[#080E10]"
    >

      <Suspense fallback={<div className="absolute inset-0 bg-[#080E10]" />}>
        <ParticleScene />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-r from-[#080E10] via-[#080E10]/80 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >

          <motion.p
            variants={itemVariants}
            className="text-[#00CFAD] font-mono text-sm md:text-base mb-4 tracking-widest"
          >
            Hi there, I'm
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4"
          >
            Hamza
            <span className="block text-gradient">
              Haider
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6 h-10"
          >
            <span className="text-xl md:text-2xl text-[#6B9E94] font-light">
              {displayText}
            </span>

            <span className="w-0.5 h-6 bg-[#00CFAD] animate-pulse" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-[#6B9E94] text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            I craft high-performance, visually stunning web experiences
            with modern technologies. Passionate about clean code,
            smooth animations, and pixel-perfect design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >

            <a
              href="#projects"
              className="
                group relative inline-flex items-center justify-center
                px-8 py-4 rounded-md overflow-hidden
                bg-[#00CFAD] text-[#080E10]
                font-semibold text-sm tracking-wide
                transition-all duration-300
                hover:shadow-[0_0_30px_rgba(0,207,173,0.4)]
              "
            >
              <span className="
                absolute inset-0 bg-white/20
                translate-x-[-100%] group-hover:translate-x-[100%]
                transition-transform duration-500 skew-x-12
              " />

              View My Work
            </a>

            <a
              href="#contact"
              className="
                inline-flex items-center justify-center
                px-8 py-4 rounded-md
                border border-[#00CFAD]/40 text-[#00CFAD]
                font-semibold text-sm tracking-wide
                hover:border-[#00CFAD] hover:bg-[#00CFAD]/10
                transition-all duration-300
              "
            >
              Get In Touch
            </a>

          </motion.div>

          {/* Social Links */}
<motion.div
  variants={itemVariants}
  className="flex items-center gap-6 mt-12"
>
  <span className="text-[#6B9E94] text-xs font-mono tracking-widest">
    FIND ME ON
  </span>

  <div className="h-px flex-1 max-w-[60px] bg-[#00CFAD]/30" />

  {/* GitHub */}
  <a
    href="https://github.com/HAmzaaider"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#6B9E94] hover:text-[#00CFAD] transition-colors duration-300"
    aria-label="GitHub"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/hamza-haider-6b8063318"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#6B9E94] hover:text-[#00CFAD] transition-colors duration-300"
    aria-label="LinkedIn"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </a>

</motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#6B9E94] text-xs font-mono tracking-widest">
          SCROLL
        </span>

        <div className="w-6 h-10 rounded-full border border-[#00CFAD]/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0,12,0] }}
            transition={{
              duration:1.5,
              repeat:Infinity,
              ease:'easeInOut'
            }}
            className="w-1 h-2 bg-[#00CFAD] rounded-full"
          />
        </div>

      </motion.div>

    </section>
  )
}

export default Hero