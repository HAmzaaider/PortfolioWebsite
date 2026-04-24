import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false)

  // useScroll gives us a 0-1 value representing scroll progress
  const { scrollYProgress } = useScroll()

  // useSpring smooths out the progress bar movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  // Only show the bar after user starts scrolling
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setIsVisible(v > 0.01)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <>
      {/* ── Top progress bar ──────────────────────────────── */}
      {/* Fixed at very top of viewport, scales from left to right */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
        style={{
          scaleX,
          // ★ Mustard gradient matching the Parchment & Ink theme
          background: 'linear-gradient(90deg, #C96A00, #E8920A, #F5B955)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ── Scroll percentage indicator ───────────────────── */}
      {/* Small pill in bottom right showing exact % */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale:   isVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="
          fixed bottom-8 right-6 z-50
          px-3 py-1.5 rounded-full
          /* ★ Navy pill with mustard text — on-theme, readable */
          bg-navy-800/90 border border-mustard-600/30
          font-mono text-xs text-mustard-400 font-semibold
          backdrop-blur-sm
          pointer-events-none
        "
      >
        {/* Convert 0-1 scroll value to percentage */}
        <motion.span>
          {useScrollPercent(scrollYProgress)}%
        </motion.span>
      </motion.div>
    </>
  )
}

// ─── Helper hook ──────────────────────────────────────────────
// Converts framer motion scroll value (0-1) into a rounded percentage
function useScrollPercent(scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']) {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setPercent(Math.round(v * 100))
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return percent
}

export default ScrollProgress