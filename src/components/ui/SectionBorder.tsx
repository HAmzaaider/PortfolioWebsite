import { motion } from 'framer-motion'

// ─── Animated section border ──────────────────────────────────
// Draws a gradient line across the top of every section
// when it enters the viewport. Triggered by isInView from parent.
// theme: 'light' = mustard line (for cream sections)
//        'dark'  = cream/gold line (for navy sections)

interface SectionBorderProps {
  isInView: boolean
  theme?: 'light' | 'dark'
  delay?: number
}

const SectionBorder = ({
  isInView,
  theme = 'light',
  delay = 0,
}: SectionBorderProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[3px] overflow-hidden z-20">
      <motion.div
        className={`w-full h-full ${
          theme === 'light' ? 'section-border-light' : 'section-border-dark'
        }`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isInView ? 1 : 0,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          delay,
        }}
        style={{ originX: 0 }}
      />
    </div>
  )
}

export default SectionBorder