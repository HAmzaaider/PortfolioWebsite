import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import { experiences, type ExperienceItem } from '@data/experience'

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -30 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─── Section Heading ──────────────────────────────────────────
interface SectionHeadingProps {
  label: string; title: string; highlight: string
}

const SectionHeading = ({ label, title, highlight }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16 text-center">
    <p className="font-mono text-sm text-mustard-600 tracking-widest mb-3">{label}</p>
    <h2
      className="text-4xl md:text-5xl font-black text-navy-800"
      style={{ fontFamily: 'Playfair Display, serif' }}
    >
      {title} <span className="text-gradient italic">{highlight}</span>
    </h2>
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="w-12 h-0.5 bg-mustard-600" />
      <div className="w-3  h-0.5 bg-mustard-600/50" />
      <div className="w-1.5 h-0.5 bg-mustard-600/25" />
    </div>
  </div>
)

// ─── Timeline Item ────────────────────────────────────────────
interface TimelineItemProps {
  item:   ExperienceItem
  index:  number
  isLast: boolean
}

const TimelineItem = ({ item, index, isLast }: TimelineItemProps) => {
  const [expanded, setExpanded] = useState(index === 0)
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={itemVariants}
      className={`
        relative flex items-start
        ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}
        flex-row
      `}
    >
      {/* ── Content panel ─────────────────────────────────── */}
      <div className={`
        flex-1 pb-10
        ${isLeft ? 'lg:pr-12 pl-8 lg:pl-0' : 'lg:pl-12 pl-8'}
      `}>
        <motion.div
          onClick={() => setExpanded(!expanded)}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="
            p-5 md:p-6 rounded-xl
            border border-navy-800/10
            bg-cream-50
            hover:border-mustard-600/30
            hover:shadow-[0_8px_30px_rgba(217,119,6,0.08)]
            transition-all duration-300
            cursor-pointer group
          "
        >
          {/* Current badge */}
          {item.current && (
            <div className={`
              flex items-center gap-1.5 mb-3
              ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
            `}>
              <span className="w-1.5 h-1.5 rounded-full bg-mustard-600 animate-pulse" />
              <span className="text-mustard-600 text-xs font-mono tracking-wide">
                Current Role
              </span>
            </div>
          )}

          {/* Role */}
          <h3
            className="text-navy-800 font-bold text-lg md:text-xl mb-1 group-hover:text-mustard-600 transition-colors duration-300"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {item.role}
          </h3>

          {/* Company + location */}
          <div className={`
            flex items-center gap-2 flex-wrap mb-3
            ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
          `}>
            <span className="text-mustard-600 font-semibold text-sm font-mono">
              {item.company}
            </span>
            <span className="text-navy-800/20 text-xs">•</span>
            <span className="text-navy-800/40 text-xs font-mono">
              {item.location}
            </span>
          </div>

          {/* Period + duration */}
          <div className={`
            flex items-center gap-3 mb-4 flex-wrap
            ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
          `}>
            <span className="
              px-2.5 py-1 rounded-full text-xs font-mono
              bg-mustard-600/8 text-mustard-600
              border border-mustard-600/20
            ">
              {item.period}
            </span>
            <span className="text-navy-800/30 text-xs font-mono">
              {item.duration}
            </span>
          </div>

          {/* Expandable content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{    opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="w-full h-px bg-mustard-600/10 mb-4" />

                {/* Bullet points */}
                <ul className={`
                  space-y-2 mb-4
                  ${isLeft ? 'lg:text-right text-left' : 'text-left'}
                `}>
                  {item.description.map((point, i) => (
                    <li
                      key={i}
                      className={`
                        flex items-start gap-2
                        text-navy-800/60 text-sm leading-relaxed
                        ${isLeft ? 'lg:flex-row-reverse flex-row' : 'flex-row'}
                      `}
                    >
                      <span className="text-mustard-600 mt-1 flex-shrink-0 text-xs">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className={`
                  flex flex-wrap gap-2
                  ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
                `}>
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="
                        px-2 py-0.5 rounded text-xs font-mono
                        bg-navy-800/5 text-navy-800/60
                        border border-navy-800/10
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand hint */}
          <div className={`
            flex items-center gap-1 mt-3
            ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
          `}>
            <span className="text-navy-800/25 text-xs font-mono">
              {expanded ? 'click to collapse' : 'click to expand'}
            </span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 text-navy-800/25"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* ── Timeline dot + line ───────────────────────────── */}
      <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="
            relative z-10
            w-4 h-4 rounded-full
            bg-mustard-600 border-2 border-cream-50
            shadow-[0_0_12px_rgba(217,119,6,0.5)]
          "
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originY: 0, height: '100%', minHeight: 120 }}
            className="w-px bg-gradient-to-b from-mustard-600/50 to-mustard-600/5"
          />
        )}
      </div>

      {/* Empty panel for zigzag layout */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────
const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work')
  const filteredItems = experiences.filter(e => e.type === activeTab)

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen bg-cream-100 py-24 md:py-32 overflow-hidden"
    >
      <div className="
        absolute bottom-0 right-0
        w-[500px] h-[500px] rounded-full
        bg-mustard-600/5 blur-3xl pointer-events-none
      " />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading label="04. MY JOURNEY" title="Work &" highlight="Experience" />
        </motion.div>

        {/* ── Tab Toggle ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-14"
        >
          <div className="
            flex gap-1 p-1 rounded-xl
            bg-cream-50 border border-navy-800/10
            shadow-sm
          ">
            {(['work', 'education'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-8 py-2.5 rounded-lg text-sm font-mono
                  transition-all duration-300 capitalize
                  ${activeTab === tab ? 'text-white' : 'text-navy-800/50 hover:text-navy-800'}
                `}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-mustard-600 rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === 'work' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  )}
                  {tab === 'work' ? 'Work' : 'Education'}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Timeline ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="relative"
          >
            {/* Center line — desktop */}
            <div className="
              hidden lg:block
              absolute left-1/2 -translate-x-1/2
              top-0 bottom-0 w-px
              bg-gradient-to-b from-mustard-600/30 via-mustard-600/15 to-transparent
            " />
            {/* Left line — mobile */}
            <div className="
              lg:hidden
              absolute left-2 top-0 bottom-0 w-px
              bg-gradient-to-b from-mustard-600/30 via-mustard-600/15 to-transparent
            " />

            {filteredItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === filteredItems.length - 1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Experience