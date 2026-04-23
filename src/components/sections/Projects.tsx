import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from 'framer-motion'

import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@data/projects'

// ─── Animation Variants ───────────────────────────────────────
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// ─── Section Heading ──────────────────────────────────────────
interface SectionHeadingProps {
  label: string
  title: string
  highlight: string
}

const SectionHeading = ({
  label,
  title,
  highlight,
}: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16 text-center">
    <p className="text-[#00CFAD] font-mono text-sm tracking-widest mb-3">
      {label}
    </p>

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

// ─── Status Badge ─────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = {
    Live: 'bg-[#00CFAD]/10 text-[#00CFAD] border-[#00CFAD]/30',
    'In Progress': 'bg-[#F5C842]/10 text-[#F5C842] border-[#F5C842]/30',
    Archived: 'bg-[#6B9E94]/10 text-[#6B9E94] border-[#6B9E94]/30',
  }

  const dotStyles = {
    Live: 'bg-[#00CFAD] animate-pulse',
    'In Progress': 'bg-[#F5C842]',
    Archived: 'bg-[#6B9E94]',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-full text-xs font-mono
        border ${styles[status]}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`}
      />
      {status}
    </span>
  )
}

// ─── Draggable Top Card ───────────────────────────────────────
// This is the card the user interacts with — drag left or right to dismiss

interface DraggableCardProps {
  project: Project
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

const DraggableCard = ({
  project,
  onSwipeLeft,
  onSwipeRight,
}: DraggableCardProps) => {
  // useMotionValue tracks the drag position without causing re-renders
  const x = useMotionValue(0)

  // Rotate the card slightly as it's dragged (feels physical)
  const rotate = useTransform(
    x,
    [-300, 0, 300],
    [-18, 0, 18]
  )

  // Fade out the card as it moves further from center
  const opacity = useTransform(
    x,
    [-250, -100, 0, 100, 250],
    [0, 1, 1, 1, 0]
  )

  // Show a LEFT indicator when dragging right (going back)
  const leftIndicatorOpacity = useTransform(
    x,
    [-50, -120],
    [0, 1]
  )

  // Show a RIGHT indicator when dragging left (going forward)
  const rightIndicatorOpacity = useTransform(
    x,
    [50, 120],
    [0, 1]
  )

  // Smooth spring physics on the drag values for indicators
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 30,
  })

  void springX

  const handleDragEnd = () => {
    const currentX = x.get()

    // If dragged far enough left → swipe left (next project)
    if (currentX < -100) {
      onSwipeLeft()
    }

    // If dragged far enough right → swipe right (previous project)
    else if (currentX > 100) {
      onSwipeRight()
    }

    // Otherwise snap back to center
  }

  return (
    <motion.div
      // drag="x" restricts dragging to horizontal axis only
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      // Entry animation — card pops in from below
      initial={{ scale: 0.8, opacity: 0, y: 60 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      // Exit animation — flies off in whichever direction it was thrown
      exit={{
        x: x.get() > 0 ? 400 : -400,
        opacity: 0,
        rotate: x.get() > 0 ? 30 : -30,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      className="
        absolute inset-0
        bg-[#0E1A1C] rounded-2xl
        border border-[#00CFAD]/25
        p-7 flex flex-col
        cursor-grab active:cursor-grabbing
        select-none
        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
      "
      whileHover={{
        boxShadow:
          '0 20px 60px rgba(0,207,173,0.12), 0 0 0 1px rgba(0,207,173,0.3)',
      }}
    >
      {/* ── Drag Direction Indicators ─────────────────────── */}

      {/* LEFT arrow — appears when dragging right (prev) */}
      <motion.div
        style={{ opacity: rightIndicatorOpacity }}
        className="
          absolute left-5 top-1/2 -translate-y-1/2
          flex items-center gap-2
          bg-[#00CFAD]/10 border border-[#00CFAD]/30
          rounded-full px-4 py-2
          pointer-events-none
        "
      >
        <svg
          className="w-4 h-4 text-[#00CFAD]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>

        <span className="text-[#00CFAD] text-xs font-mono">
          PREV
        </span>
      </motion.div>

      {/* RIGHT arrow — appears when dragging left (next) */}
      <motion.div
        style={{ opacity: leftIndicatorOpacity }}
        className="
          absolute right-5 top-1/2 -translate-y-1/2
          flex items-center gap-2
          bg-[#00CFAD]/10 border border-[#00CFAD]/30
          rounded-full px-4 py-2
          pointer-events-none
        "
      >
        <span className="text-[#00CFAD] text-xs font-mono">
          NEXT
        </span>

        <svg
          className="w-4 h-4 text-[#00CFAD]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>

      {/* ── Card Top Row ──────────────────────────────────── */}
      <div className="flex items-start justify-between mb-5">
        <span className="text-6xl font-bold text-[#00CFAD]/8 leading-none select-none">
          {String(project.id).padStart(2, '0')}
        </span>

        <StatusBadge status={project.status} />
      </div>

      {/* ── Project Title ─────────────────────────────────── */}
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
        {project.title}
      </h3>

      {/* ── Category pill ─────────────────────────────────── */}
      <span
        className="
          inline-block self-start
          px-3 py-1 rounded-full text-xs font-mono mb-4
          bg-[#152424] text-[#00CFAD]
          border border-[#00CFAD]/20
        "
      >
        {project.category}
      </span>

      {/* ── Description ───────────────────────────────────── */}
      <p className="text-[#6B9E94] text-sm md:text-base leading-relaxed mb-5 flex-1">
        {project.longDescription}
      </p>

      {/* ── Tech Stack Tags ───────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="
              px-2.5 py-1 rounded-md text-xs font-mono
              bg-[#152424] text-[#00CFAD]
              border border-[#00CFAD]/10
            "
          >
            {tech}
          </span>
        ))}
      </div>

      {/* ── Action Buttons ────────────────────────────────── */}
      <div className="flex gap-3 mt-auto">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl
            border border-[#00CFAD]/25 text-[#00CFAD]
            text-sm font-mono
            hover:bg-[#00CFAD]/10 hover:border-[#00CFAD]/50
            transition-all duration-300
          "
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385..." />
          </svg>
          GitHub
        </a>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl
            bg-[#00CFAD] text-[#080E10]
            text-sm font-mono font-semibold
            hover:bg-[#2ECFB0]
            transition-all duration-300
          "
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>

          Live Demo
        </a>
      </div>

      {/* ── Drag hint at the bottom ───────────────────────── */}
      <p className="text-center text-[#6B9E94]/40 text-xs font-mono mt-4">
        drag to browse
      </p>
    </motion.div>
  )
}

// ─── Background Card ──────────────────────────────────────────
// The 2nd and 3rd cards peeking behind the top card

interface BackgroundCardProps {
  offset: number
  rotate: number
}

const BackgroundCard = ({
  offset,
  rotate,
}: BackgroundCardProps) => (
  <motion.div
    animate={{
      y: offset * 14,
      rotate,
      scale: 1 - offset * 0.05,
      opacity: 1 - offset * 0.15,
    }}
    transition={{
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }}
    className="
      absolute inset-0
      bg-[#0E1A1C] rounded-2xl
      border border-[#00CFAD]/10
      shadow-[0_10px_40px_rgba(0,0,0,0.3)]
    "
    style={{
      background: `rgba(14,26,28,${0.9 - offset * 0.1})`,
    }}
  />
)

// ─── Main Component ───────────────────────────────────────────

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  })

  // Active filter category
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>('All')

  // Current index — which project is on top of the deck
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter projects by category
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(
          (p) => p.category === activeCategory
        )

  const goNext = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % filteredProjects.length
    )
  }

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? filteredProjects.length - 1
        : prev - 1
    )
  }

  // Reset index when category changes
  const handleCategoryChange = (
    cat: ProjectCategory
  ) => {
    setActiveCategory(cat)
    setCurrentIndex(0)
  }

  // The 3 projects to show in the deck
  const visibleProjects = [0, 1, 2].map(
    (offset) =>
      filteredProjects[
        (currentIndex + offset) %
          filteredProjects.length
      ]
  )

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0E1A1C] py-24 md:py-32 overflow-hidden"
    >
      {/* ── Background decorations ────────────────────────── */}
      <div
        className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full
          bg-[#00CFAD]/3 blur-3xl pointer-events-none
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Heading ───────────────────────────────────────── */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SectionHeading
            label="03. WHAT I'VE BUILT"
            title="My"
            highlight="Projects"
          />
        </motion.div>

        {/* ── Category Filter ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{
            delay: 0.2,
            duration: 0.6,
          }}
          className="flex justify-center flex-wrap gap-3 mb-16"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                handleCategoryChange(cat)
              }
              className={`
                px-5 py-2 rounded-full text-sm font-mono
                border transition-all duration-300
                ${
                  activeCategory === cat
                    ? 'bg-[#00CFAD] text-[#080E10] border-[#00CFAD] font-semibold'
                    : 'text-[#6B9E94] border-[#00CFAD]/20 hover:border-[#00CFAD]/50 hover:text-white'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Card Deck ─────────────────────────────────── */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : {}
            }
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
            className="relative w-full max-w-md mx-auto lg:mx-0"
            style={{ height: 520 }}
          >
            {filteredProjects.length > 2 && (
              <BackgroundCard
                offset={2}
                rotate={-6}
              />
            )}

            {filteredProjects.length > 1 && (
              <BackgroundCard
                offset={1}
                rotate={4}
              />
            )}

            {filteredProjects.length > 0 && (
              <DraggableCard
                key={`${activeCategory}-${currentIndex}`}
                project={visibleProjects[0]}
                onSwipeLeft={goNext}
                onSwipeRight={goPrev}
              />
            )}
          </motion.div>

          {/* ── Right Side Info Panel ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : {}
            }
            transition={{
              delay: 0.4,
              duration: 0.7,
            }}
            className="flex flex-col items-center lg:items-start gap-8 flex-1"
          >
            <div className="text-center lg:text-left">
              <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                <motion.span
                  key={currentIndex}
                  initial={{
                    opacity: 0,
                    y: -20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="text-6xl font-bold text-gradient"
                >
                  {String(
                    currentIndex + 1
                  ).padStart(2, '0')}
                </motion.span>

                <span className="text-2xl text-[#6B9E94] font-mono">
                  /{' '}
                  {String(
                    filteredProjects.length
                  ).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setCurrentIndex(i)
                  }
                >
                  <div
                    className={`
                      rounded-full transition-all duration-300
                      ${
                        i === currentIndex
                          ? 'w-8 h-2 bg-[#00CFAD]'
                          : 'w-2 h-2 bg-[#00CFAD]/25'
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={goPrev}
                className="w-14 h-14 rounded-full border border-[#00CFAD]/25"
              >
                ←
              </button>

              <button
                onClick={goNext}
                className="w-14 h-14 rounded-full bg-[#00CFAD]"
              >
                →
              </button>
            </div>

            {/* ── GitHub CTA ────────────────────────────────── */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3
                px-6 py-3 rounded-xl font-mono text-sm
                border border-[#00CFAD]/25 text-[#00CFAD]
                hover:bg-[#00CFAD] hover:text-[#080E10]
                transition-all duration-300
              "
            >
              All Repos on GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects