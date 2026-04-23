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
  exit: {
    opacity: 0, x: 30,
    transition: { duration: 0.3 },
  },
}

// ─── Section Heading ──────────────────────────────────────────
interface SectionHeadingProps {
  label: string
  title: string
  highlight: string
}

const SectionHeading = ({ label, title, highlight }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16 text-center">
    <p className="text-[#00CFAD] font-mono text-sm tracking-widest mb-3">{label}</p>
    <h2 className="text-4xl md:text-5xl font-bold text-white">
      {title} <span className="text-gradient">{highlight}</span>
    </h2>
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="w-12 h-0.5 bg-[#00CFAD]" />
      <div className="w-3 h-0.5 bg-[#00CFAD]/50" />
      <div className="w-1.5 h-0.5 bg-[#00CFAD]/25" />
    </div>
  </div>
)

// ─── Timeline Item ────────────────────────────────────────────
interface TimelineItemProps {
  item: ExperienceItem
  index: number
  isLast: boolean
}

const TimelineItem = ({ item, index, isLast }: TimelineItemProps) => {
  // Each card tracks its own expanded state for bullet points
  const [expanded, setExpanded] = useState(index === 0)

  // Alternate left/right on desktop for visual interest
  // On mobile everything stacks to the right of the timeline
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={itemVariants}
      className={`
        relative flex items-start gap-0
        ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}
        flex-row
      `}
    >
      {/* ── Left/Right content panel ──────────────────────── */}
      <div className={`
        flex-1 pb-10
        ${isLeft ? 'lg:pr-12 lg:text-right pr-0 pl-8' : 'lg:pl-12 lg:text-left pl-8'}
      `}>
        <motion.div
          onClick={() => setExpanded(!expanded)}
          className="
            relative p-5 md:p-6 rounded-xl
            border border-[#00CFAD]/15 bg-[#152424]/50
            hover:border-[#00CFAD]/35 hover:bg-[#152424]
            transition-all duration-300
            cursor-pointer group
          "
          // Subtle lift on hover
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          {/* Current role badge */}
          {item.current && (
            <div className={`
              flex items-center gap-1.5 mb-3
              ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
            `}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00CFAD] animate-pulse" />
              <span className="text-[#00CFAD] text-xs font-mono tracking-wide">
                Current Role
              </span>
            </div>
          )}

          {/* Role title */}
          <h3 className="text-white font-bold text-lg md:text-xl mb-1 group-hover:text-[#00CFAD] transition-colors duration-300">
            {item.role}
          </h3>

          {/* Company + location row */}
          <div className={`
            flex items-center gap-2 flex-wrap mb-3
            ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
          `}>
            <span className="text-[#00CFAD] font-semibold text-sm">
              {item.company}
            </span>
            <span className="text-[#6B9E94]/40 text-xs">•</span>
            <span className="text-[#6B9E94] text-xs font-mono">
              {item.location}
            </span>
          </div>

          {/* Period + duration row */}
          <div className={`
            flex items-center gap-3 mb-4 flex-wrap
            ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
          `}>
            <span className="
              px-2.5 py-1 rounded-full text-xs font-mono
              bg-[#0E1A1C] text-[#6B9E94]
              border border-[#00CFAD]/10
            ">
              {item.period}
            </span>
            <span className="text-[#6B9E94]/60 text-xs font-mono">
              {item.duration}
            </span>
          </div>

          {/* Expandable description bullets */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{    opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                {/* Divider */}
                <div className="w-full h-px bg-[#00CFAD]/10 mb-4" />

                {/* Bullet points */}
                <ul className={`
                  space-y-2 mb-4
                  ${isLeft ? 'lg:text-right text-left' : 'text-left'}
                `}>
                  {item.description.map((point, i) => (
                    <li
                      key={i}
                      className={`
                        flex items-start gap-2 text-[#6B9E94] text-sm leading-relaxed
                        ${isLeft ? 'lg:flex-row-reverse flex-row' : 'flex-row'}
                      `}
                    >
                      <span className="text-[#00CFAD] mt-1 flex-shrink-0 text-xs">▸</span>
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
                        bg-[#080E10] text-[#00CFAD]
                        border border-[#00CFAD]/15
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand/collapse indicator */}
          <div className={`
            flex items-center gap-1 mt-3
            ${isLeft ? 'lg:justify-end justify-start' : 'justify-start'}
          `}>
            <span className="text-[#6B9E94]/40 text-xs font-mono">
              {expanded ? 'click to collapse' : 'click to expand'}
            </span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 text-[#6B9E94]/40"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* ── Center Timeline Line + Dot ────────────────────── */}
      <div className="
        absolute left-0 lg:left-1/2 lg:-translate-x-1/2
        flex flex-col items-center
      ">
        {/* Dot on the timeline */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
          className="
            relative z-10
            w-4 h-4 rounded-full
            bg-[#00CFAD] border-2 border-[#080E10]
            shadow-[0_0_12px_rgba(0,207,173,0.6)]
          "
        />

        {/* Vertical line connecting dots — hidden on last item */}
       {!isLast && (
  <motion.div
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}

    style={{
      originY: 0,
      height: '100%',
      minHeight: 120
    }}

    className="w-px bg-gradient-to-b from-[#00CFAD]/60 to-[#00CFAD]/10"
  />
)}
      </div>

      {/* ── Empty right/left panel (for alternating layout) ─ */}
      {/* On desktop only — creates the zigzag alternating look */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────
const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' })

  // Tab state — Work or Education
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work')

  // Filter items by active tab
  const filteredItems = experiences.filter((e) => e.type === activeTab)

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen bg-[#080E10] py-24 md:py-32 overflow-hidden"
    >
      {/* ── Background decoration ─────────────────────────── */}
      <div className="
        absolute bottom-0 right-0
        w-[500px] h-[500px] rounded-full
        bg-[#00CFAD]/3 blur-3xl pointer-events-none
      " />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">

        {/* ── Heading ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            label="04. MY JOURNEY"
            title="Work &"
            highlight="Experience"
          />
        </motion.div>

        {/* ── Work / Education Tab Toggle ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-14"
        >
          <div className="
            flex gap-1 p-1 rounded-xl
            bg-[#0E1A1C] border border-[#00CFAD]/15
          ">
            {/* Work tab */}
            <button
              onClick={() => setActiveTab('work')}
              className={`
                relative px-8 py-2.5 rounded-lg text-sm font-mono
                transition-all duration-300
                ${activeTab === 'work'
                  ? 'text-[#080E10]'
                  : 'text-[#6B9E94] hover:text-white'
                }
              `}
            >
              {/* Sliding pill background */}
              {activeTab === 'work' && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-[#00CFAD] rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {/* Briefcase icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Work
              </span>
            </button>

            {/* Education tab */}
            <button
              onClick={() => setActiveTab('education')}
              className={`
                relative px-8 py-2.5 rounded-lg text-sm font-mono
                transition-all duration-300
                ${activeTab === 'education'
                  ? 'text-[#080E10]'
                  : 'text-[#6B9E94] hover:text-white'
                }
              `}
            >
              {activeTab === 'education' && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-[#00CFAD] rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {/* Graduation cap icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Education
              </span>
            </button>
          </div>
        </motion.div>

        {/* ── Timeline ──────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            // Timeline is relative so the line + dots position correctly
            className="relative"
          >
            {/* Vertical center line — desktop only */}
            <div className="
              hidden lg:block
              absolute left-1/2 -translate-x-1/2
              top-0 bottom-0 w-px
              bg-gradient-to-b from-[#00CFAD]/40 via-[#00CFAD]/20 to-transparent
            " />

            {/* Left side line — mobile only */}
            <div className="
              lg:hidden
              absolute left-2 top-0 bottom-0 w-px
              bg-gradient-to-b from-[#00CFAD]/40 via-[#00CFAD]/20 to-transparent
            " />

            {/* Timeline items */}
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