import { useRef, useState } from 'react'
// At top of each section component, import:
import SectionBorder from '@components/ui/SectionBorder'
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

const SectionHeading = ({ label, title, highlight }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16 text-center">
    <p className="text-mustard-600 font-mono text-sm tracking-widest mb-3">
      {label}
    </p>
    <h2 className="text-4xl md:text-5xl font-bold text-navy-800">
      {title} <span className="text-gradient">{highlight}</span>
    </h2>
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="w-12 h-0.5 bg-mustard-600" />
      <div className="w-3 h-0.5 bg-mustard-600/50" />
      <div className="w-1.5 h-0.5 bg-mustard-600/25" />
    </div>
  </div>
)

// ─── Status Badge ─────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = {
    Live: 'bg-mustard-600/10 text-mustard-600 border-mustard-600/30',
    'In Progress': 'bg-mustard-400/20 text-navy-800 border-mustard-400/50',
    Archived: 'bg-navy-800/10 text-navy-800/60 border-navy-800/20',
  }

  const dotStyles = {
    Live: 'bg-mustard-600 animate-pulse',
    'In Progress': 'bg-mustard-400',
    Archived: 'bg-navy-800/40',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  )
}

// ─── Draggable Top Card ───────────────────────────────────────
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

  const x = useMotionValue(0)

  const rotate = useTransform(
    x,
    [-300, 0, 300],
    [-18, 0, 18]
  )

  const opacity = useTransform(
    x,
    [-250, -100, 0, 100, 250],
    [0, 1, 1, 1, 0]
  )

  const leftIndicatorOpacity = useTransform(
    x,
    [-50, -120],
    [0, 1]
  )

  const rightIndicatorOpacity = useTransform(
    x,
    [50, 120],
    [0, 1]
  )

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 30,
  })

  void springX

  const handleDragEnd = () => {
    const currentX = x.get()

    if (currentX < -100) {
      onSwipeLeft()
    } else if (currentX > 100) {
      onSwipeRight()
    }
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.8, opacity: 0, y: 60 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
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
        bg-cream-50 rounded-2xl
        border border-mustard-600/25
        p-7 flex flex-col
        cursor-grab active:cursor-grabbing
        select-none
        shadow-[0_20px_60px_rgba(217,119,6,0.10)]
      "
      whileHover={{
        boxShadow:
          '0 20px 60px rgba(217,119,6,0.18), 0 0 0 1px rgba(217,119,6,0.25)',
      }}
    >
      {/* ── PREV indicator ───────────────────────────────── */}
      <motion.div
        style={{ opacity: rightIndicatorOpacity }}
        className="
          absolute left-5 top-1/2 -translate-y-1/2
          flex items-center gap-2
          bg-mustard-600/10 border border-mustard-600/30
          rounded-full px-4 py-2 pointer-events-none
        "
      >
        <svg className="w-4 h-4 text-mustard-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
        <span className="text-mustard-600 text-xs font-mono">PREV</span>
      </motion.div>

      {/* ── NEXT indicator ───────────────────────────────── */}
      <motion.div
        style={{ opacity: leftIndicatorOpacity }}
        className="
          absolute right-5 top-1/2 -translate-y-1/2
          flex items-center gap-2
          bg-mustard-600/10 border border-mustard-600/30
          rounded-full px-4 py-2 pointer-events-none
        "
      >
        <span className="text-mustard-600 text-xs font-mono">NEXT</span>
        <svg className="w-4 h-4 text-mustard-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </motion.div>

      {/* ── Card Top Row ──────────────────────────────────── */}
      <div className="flex items-start justify-between mb-5">
        <span className="text-6xl font-bold text-mustard-600/10 leading-none select-none">
          {String(project.id).padStart(2,'0')}
        </span>

        <StatusBadge status={project.status}/>
      </div>

      {/* ── Project Title ─────────────────────────────────── */}
      <h3 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3 leading-tight">
        {project.title}
      </h3>

      {/* ── Category pill ─────────────────────────────────── */}
      <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-mono mb-4 bg-cream-200 text-mustard-600 border border-mustard-600/20">
        {project.category}
      </span>

      {/* ── Description ───────────────────────────────────── */}
      <p className="text-navy-800/60 text-sm md:text-base leading-relaxed mb-5 flex-1">
        {project.longDescription}
      </p>

      {/* ── Tech Stack Tags ───────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech)=>(
          <span
            key={tech}
            className="px-2.5 py-1 rounded-md text-xs font-mono bg-cream-100 text-navy-800 border border-mustard-600/15"
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
          onClick={(e)=>e.stopPropagation()}
          className="
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl
            border border-mustard-600/30 text-mustard-600
            text-sm font-mono
            hover:bg-mustard-600/10 hover:border-mustard-600/60
            transition-all duration-300
          "
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385..." />
          </svg>
          GitHub
        </a>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e)=>e.stopPropagation()}
          className="
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl
            bg-mustard-600 text-cream-50
            text-sm font-mono font-semibold
            hover:bg-mustard-500
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

      {/* ── Drag hint ─────────────────────────────────────── */}
      <p className="text-center text-navy-800/30 text-xs font-mono mt-4">
        drag to browse
      </p>

    </motion.div>
  )
}

// ─── Background Card ──────────────────────────────────────────
interface BackgroundCardProps {
  offset: number
  rotate: number
}

const BackgroundCard = ({ offset, rotate }: BackgroundCardProps) => (
  <motion.div
    animate={{
      y: offset * 14,
      rotate,
      scale: 1 - offset * 0.05,
      opacity: 1 - offset * 0.15,
    }}
    transition={{
      type:'spring',
      stiffness:300,
      damping:30
    }}
    className="absolute inset-0 rounded-2xl border border-mustard-600/15 shadow-[0_10px_40px_rgba(217,119,6,0.08)]"
    style={{
      background:`rgba(254,243,199,${0.9-offset*0.1})`
    }}
  />
)

// ─── Main Component ───────────────────────────────────────────
const Projects = () => {

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef,{ once:true, margin:'-100px' })

  const [activeCategory,setActiveCategory] =
    useState<ProjectCategory>('All')

  const [currentIndex,setCurrentIndex] =
    useState(0)

  const filteredProjects =
    activeCategory==='All'
      ? projects
      : projects.filter(p=>p.category===activeCategory)

  const goNext = () =>
    setCurrentIndex(prev=>(prev+1)%filteredProjects.length)

  const goPrev = () =>
    setCurrentIndex(prev=>
      prev===0
        ? filteredProjects.length-1
        : prev-1
    )

  const handleCategoryChange = (cat:ProjectCategory)=>{
    setActiveCategory(cat)
    setCurrentIndex(0)
  }

  const visibleProjects=[0,1,2].map(
    offset=>filteredProjects[
      (currentIndex+offset)%filteredProjects.length
    ]
  )

  return (
    // ── navy-900: darkest section — most dramatic ─────────────────
<section
  id="projects"
  ref={sectionRef}
  className="relative min-h-screen bg-navy-900 py-24 md:py-32 overflow-hidden"
>
  <SectionBorder isInView={isInView} theme="dark" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mustard-600/4 blur-3xl pointer-events-none" />




      {/* ── Background glow ───────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mustard-600/5 blur-3xl pointer-events-none"/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Heading ───────────────────────────────────────── */}
       <p className="text-mustard-400 font-mono text-sm tracking-widest mb-3">03. WHAT I'VE BUILT</p>
<h2 className="text-4xl md:text-5xl font-bold text-cream-50" style={{ fontFamily: 'Playfair Display, serif' }}>
  My{' '}
  <span className="text-gradient-light inline-block">Projects</span>
</h2>
<div className="flex items-center justify-center gap-3 mt-4">
  <div className="w-12 h-0.5 bg-mustard-500" />
  <div className="w-3 h-0.5 bg-mustard-500/50" />
  <div className="w-1.5 h-0.5 bg-mustard-500/25" />
</div>

        {/* ── Category Filter ───────────────────────────────── */}
        <motion.div
          initial={{opacity:0,y:20}}
          animate={isInView?{opacity:1,y:0}:{}}
          transition={{delay:0.2,duration:0.6}}
          className="flex justify-center flex-wrap gap-3 mb-16"
        >
          {projectCategories.map(cat=>(
            <button
              key={cat}
              onClick={()=>handleCategoryChange(cat)}
              className={`
                px-5 py-2 rounded-full text-sm font-mono
                border transition-all duration-300
                ${
                  activeCategory===cat
                    ? 'bg-mustard-600 text-cream-50 border-mustard-600 font-semibold'
                    : 'text-navy-800/60 border-mustard-600/25 hover:border-mustard-600/60 hover:text-navy-800'
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
            initial={{opacity:0,scale:0.9}}
            animate={isInView?{opacity:1,scale:1}:{}}
            transition={{delay:0.3,duration:0.7}}
            className="relative w-full max-w-md mx-auto lg:mx-0"
            style={{height:520}}
          >
            {filteredProjects.length>2 && <BackgroundCard offset={2} rotate={-6}/>}
            {filteredProjects.length>1 && <BackgroundCard offset={1} rotate={4}/>}
            {filteredProjects.length>0 && (
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
            initial={{opacity:0,x:40}}
            animate={isInView?{opacity:1,x:0}:{}}
            transition={{delay:0.4,duration:0.7}}
            className="flex flex-col items-center lg:items-start gap-8 flex-1"
          >

            <div className="flex items-baseline gap-2">
              <motion.span
                key={currentIndex}
                initial={{opacity:0,y:-20}}
                animate={{opacity:1,y:0}}
                className="text-6xl font-bold text-gradient"
              >
                {String(currentIndex+1).padStart(2,'0')}
              </motion.span>

              <span className="text-2xl text-navy-800/40 font-mono">
                / {String(filteredProjects.length).padStart(2,'0')}
              </span>
            </div>

            {/* Dot navigation */}
            <div className="flex gap-2">
              {filteredProjects.map((_,i)=>(
                <button key={i} onClick={()=>setCurrentIndex(i)}>
                  <div className={`rounded-full transition-all duration-300 ${
                    i===currentIndex
                      ? 'w-8 h-2 bg-mustard-600'
                      : 'w-2 h-2 bg-mustard-600/25'
                  }`} />
                </button>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-4">
              <button
                onClick={goPrev}
                className="w-14 h-14 rounded-full border border-mustard-600/30 text-mustard-600"
              >
                ←
              </button>

              <button
                onClick={goNext}
                className="w-14 h-14 rounded-full bg-mustard-600 text-cream-50"
              >
                →
              </button>
            </div>

            {/* GitHub CTA */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3
                px-6 py-3 rounded-xl font-mono text-sm
                border border-mustard-600/30 text-mustard-600
                hover:bg-mustard-600 hover:text-cream-50
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