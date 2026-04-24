import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from 'framer-motion'
import { projects, projectCategories, type Project, type ProjectCategory } from '@data/projects'
import SectionBorder from '@components/ui/SectionBorder'

// ─── Animation Variants ───────────────────────────────────────
const headingVariants: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─── Status Badge ─────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = {
    'Live':        'bg-mustard-500/15 text-mustard-400 border-mustard-500/30',
    'In Progress': 'bg-cream-50/10 text-cream-50/70 border-cream-50/20',
    'Archived':    'bg-cream-50/5 text-cream-50/40 border-cream-50/10',
  }
  const dotStyles = {
    'Live':        'bg-mustard-400 animate-pulse',
    'In Progress': 'bg-cream-50/60',
    'Archived':    'bg-cream-50/30',
  }
  return (
    <span className={`
      inline-flex items-center gap-1.5
      px-2.5 py-1 rounded-full text-xs font-mono font-semibold
      border ${styles[status]}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  )
}

// ─── Draggable Top Card ───────────────────────────────────────
interface DraggableCardProps {
  project:      Project
  onSwipeLeft:  () => void
  onSwipeRight: () => void
}

const DraggableCard = ({ project, onSwipeLeft, onSwipeRight }: DraggableCardProps) => {
  // useMotionValue tracks drag position without triggering re-renders
  const x = useMotionValue(0)

  // Card rotates slightly as it's dragged — feels physical
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18])

  // Card fades out as it approaches the throw threshold
  const opacity = useTransform(x, [-250, -100, 0, 100, 250], [0, 1, 1, 1, 0])

  // PREV indicator appears when dragging right
  const rightIndicatorOpacity = useTransform(x, [50, 120], [0, 1])

  // NEXT indicator appears when dragging left
  const leftIndicatorOpacity = useTransform(x, [-50, -120], [0, 1])

  // Spring on x for the indicators — makes them feel elastic
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  void springX

  const handleDragEnd = () => {
    const currentX = x.get()
    if (currentX < -100) onSwipeLeft()
    else if (currentX > 100) onSwipeRight()
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.8, opacity: 0, y: 60 }}
      animate={{ scale: 1,   opacity: 1, y: 0  }}
      exit={{
        x:       x.get() > 0 ? 400 : -400,
        opacity: 0,
        rotate:  x.get() > 0 ? 30 : -30,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      // ── navy-800 card on navy-900 section — subtle depth ─────
      className="
        absolute inset-0
        bg-navy-800 rounded-2xl
        border border-mustard-600/20
        p-7 flex flex-col
        cursor-grab active:cursor-grabbing
        select-none
        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
      "
      whileHover={{
        boxShadow: '0 20px_60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,106,0,0.3)',
      }}
    >
      {/* ── PREV indicator ─────────────────────────────────── */}
      <motion.div
        style={{ opacity: rightIndicatorOpacity }}
        className="
          absolute left-5 top-1/2 -translate-y-1/2
          flex items-center gap-2
          bg-mustard-600/15 border border-mustard-600/30
          rounded-full px-4 py-2 pointer-events-none
        "
      >
        <svg className="w-4 h-4 text-mustard-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
        <span className="text-mustard-400 text-xs font-mono font-bold">PREV</span>
      </motion.div>

      {/* ── NEXT indicator ─────────────────────────────────── */}
      <motion.div
        style={{ opacity: leftIndicatorOpacity }}
        className="
          absolute right-5 top-1/2 -translate-y-1/2
          flex items-center gap-2
          bg-mustard-600/15 border border-mustard-600/30
          rounded-full px-4 py-2 pointer-events-none
        "
      >
        <span className="text-mustard-400 text-xs font-mono font-bold">NEXT</span>
        <svg className="w-4 h-4 text-mustard-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </motion.div>

      {/* ── Card Top Row ────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-5">
        {/* Faint project number — decorative */}
        <span className="text-6xl font-bold text-cream-50/5 leading-none select-none"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          {String(project.id).padStart(2, '0')}
        </span>
        <StatusBadge status={project.status} />
      </div>

      {/* ── Project Title ───────────────────────────────────── */}
      <h3
        className="text-2xl md:text-3xl font-bold text-cream-50 mb-3 leading-tight"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {project.title}
      </h3>

      {/* ── Category pill ───────────────────────────────────── */}
      <span className="
        inline-block self-start
        px-3 py-1 rounded-full text-xs font-mono font-bold mb-4
        bg-mustard-600/15 text-mustard-400
        border border-mustard-600/25
      ">
        {project.category}
      </span>

      {/* ── Description ─────────────────────────────────────── */}
      <p className="text-cream-50/65 text-sm md:text-base leading-relaxed mb-5 flex-1">
        {project.longDescription}
      </p>

      {/* ── Tech Stack Tags ──────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="
              px-2.5 py-1 rounded-md text-xs font-mono font-semibold
              bg-navy-700/80 text-cream-50/70
              border border-cream-50/10
            "
          >
            {tech}
          </span>
        ))}
      </div>

      {/* ── Action Buttons ───────────────────────────────────── */}
      <div className="flex gap-3 mt-auto">
        {/* GitHub — dark bg secondary style */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl
            border border-cream-50/15 text-cream-50/70
            text-sm font-mono font-semibold
            hover:border-mustard-400/50 hover:text-mustard-400
            hover:bg-mustard-400/8
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>

        {/* Live Demo — dark bg primary style */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl
            bg-mustard-500 text-navy-900
            text-sm font-mono font-bold
            hover:bg-mustard-400
            hover:shadow-[0_0_20px_rgba(201,106,0,0.6),0_0_40px_rgba(201,106,0,0.2)]
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Live Demo
        </a>
      </div>

      {/* Drag hint */}
      <p className="text-center text-cream-50/20 text-xs font-mono mt-4 tracking-widest">
        drag to browse
      </p>
    </motion.div>
  )
}

// ─── Background Card ──────────────────────────────────────────
// Cards peeking behind — slightly lighter than navy-900 for depth
interface BackgroundCardProps {
  offset: number
  rotate: number
}

const BackgroundCard = ({ offset, rotate }: BackgroundCardProps) => (
  <motion.div
    animate={{
      y:       offset * 14,
      rotate,
      scale:   1 - offset * 0.05,
      opacity: 1 - offset * 0.2,
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className="absolute inset-0 rounded-2xl border border-mustard-600/10"
    style={{
      // Each background card is slightly lighter than navy-900
      background: `rgba(13, 37, 69, ${0.85 - offset * 0.1})`,
    }}
  />
)

// ─── Main Component ───────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' })

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All')
  const [currentIndex,   setCurrentIndex]   = useState(0)

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(p => p.category === activeCategory)

  const goNext = () =>
    setCurrentIndex(prev => (prev + 1) % filteredProjects.length)

  const goPrev = () =>
    setCurrentIndex(prev =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    )

  const handleCategoryChange = (cat: ProjectCategory) => {
    setActiveCategory(cat)
    setCurrentIndex(0)
  }

  // The 3 projects visible in the deck at any time
  const visibleProjects = [0, 1, 2].map(
    offset => filteredProjects[(currentIndex + offset) % filteredProjects.length]
  )

  return (
    // ── navy-900: darkest section — most dramatic ─────────────
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-navy-900 py-24 md:py-32 overflow-hidden"
    >
      {/* Animated border at top — cream/gold on dark bg */}
      <SectionBorder isInView={isInView} theme="dark" />

      {/* Background glow */}
      <div className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[600px] h-[600px] rounded-full
        bg-mustard-600/4 blur-3xl pointer-events-none
      " />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #F5B955 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Heading ─────────────────────────────────────────── */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12 md:mb-16 text-center"
        >
          <p className="text-mustard-400 font-mono text-sm font-semibold tracking-widest mb-3">
            03. WHAT I'VE BUILT
          </p>
          {/* Rule applied: gradient isolated in span */}
          <h2
            className="text-4xl md:text-5xl font-black text-cream-50"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            My{' '}
            <span className="text-gradient-light inline-block italic">Projects</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-0.5 bg-mustard-500" />
            <div className="w-3  h-0.5 bg-mustard-500/50" />
            <div className="w-1.5 h-0.5 bg-mustard-500/25" />
          </div>
        </motion.div>

        {/* ── Category Filter ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center flex-wrap gap-3 mb-16"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`
                px-5 py-2 rounded-full text-sm font-mono font-bold
                border transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-mustard-500 text-navy-900 border-mustard-500 shadow-[0_4px_20px_rgba(201,106,0,0.4)]'
                  : 'text-cream-50/50 border-cream-50/15 hover:border-mustard-400/50 hover:text-cream-50'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Deck + Info Layout ───────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Card Deck ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative w-full max-w-md mx-auto lg:mx-0"
            style={{ height: 520 }}
          >
            {/* Card 3 — furthest back */}
            {filteredProjects.length > 2 && (
              <BackgroundCard offset={2} rotate={-6} />
            )}
            {/* Card 2 — middle */}
            {filteredProjects.length > 1 && (
              <BackgroundCard offset={1} rotate={4} />
            )}
            {/* Card 1 — top, draggable */}
            {/* key forces re-mount = fresh animation on every card change */}
            {filteredProjects.length > 0 && (
              <DraggableCard
                key={`${activeCategory}-${currentIndex}`}
                project={visibleProjects[0]}
                onSwipeLeft={goNext}
                onSwipeRight={goPrev}
              />
            )}
          </motion.div>

          {/* ── Right Info Panel ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-col items-center lg:items-start gap-8 flex-1"
          >
            {/* ── Counter ─────────────────────────────────────── */}
            <div className="flex items-baseline gap-2 justify-center lg:justify-start">
              {/* Number animates on change */}
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black leading-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {/* Rule applied: gradient isolated */}
                <span className="text-gradient-light inline-block">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
              </motion.span>
              <span className="text-2xl text-cream-50/30 font-mono">
                / {String(filteredProjects.length).padStart(2, '0')}
              </span>
            </div>

            {/* ── Dot indicators ──────────────────────────────── */}
            <div className="flex gap-2 flex-wrap">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="transition-all duration-300"
                  aria-label={`Go to project ${i + 1}`}
                >
                  <div className={`
                    rounded-full transition-all duration-300
                    ${i === currentIndex
                      ? 'w-8 h-2 bg-mustard-400'
                      : 'w-2 h-2 bg-mustard-400/20 hover:bg-mustard-400/40'
                    }
                  `} />
                </button>
              ))}
            </div>

            {/* ── Prev / Next buttons ──────────────────────────── */}
            <div className="flex gap-4">
              <button
                onClick={goPrev}
                aria-label="Previous project"
                className="
                  w-14 h-14 rounded-full
                  border border-mustard-400/25 text-mustard-400
                  flex items-center justify-center
                  hover:border-mustard-400 hover:bg-mustard-400/10
                  transition-all duration-300 group
                "
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
              </button>

              <button
                onClick={goNext}
                aria-label="Next project"
                className="
                  w-14 h-14 rounded-full
                  bg-mustard-500 text-navy-900
                  flex items-center justify-center
                  hover:bg-mustard-400
                  hover:shadow-[0_0_20px_rgba(201,106,0,0.6),0_0_40px_rgba(201,106,0,0.2)]
                  transition-all duration-300 group
                "
              >
                <svg
                  className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* ── Instructions ────────────────────────────────── */}
            <div className="p-4 rounded-xl border border-cream-50/8 bg-navy-800/50 font-mono text-sm text-cream-50/40 space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-mustard-400">←→</span>
                Drag the card left or right
              </p>
              <p className="flex items-center gap-2">
                <span className="text-mustard-400">●</span>
                Click dots to jump to a project
              </p>
              <p className="flex items-center gap-2">
                <span className="text-mustard-400">↑</span>
                Use arrow buttons to navigate
              </p>
            </div>

            {/* ── GitHub CTA ───────────────────────────────────── */}
            <a
              href="https://github.com/HAmzaaider"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3
                px-6 py-3 rounded-xl font-mono text-base font-bold
                border border-mustard-400/25 text-mustard-400
                hover:bg-mustard-500 hover:text-navy-900
                hover:border-mustard-500
                hover:shadow-[0_0_20px_rgba(201,106,0,0.5)]
                transition-all duration-300 group
              "
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              All Repos on GitHub
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects