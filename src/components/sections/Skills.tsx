import { useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { skills, techStack, skillCategories, type SkillCategory } from '@data/skills'

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─── Reusable Section Heading ─────────────────────────────────
// Same pattern as About — keeping UI consistent across sections
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

// ─── Skill Bar ────────────────────────────────────────────────
// Each bar animates its width from 0 to the skill level on scroll
interface SkillBarProps {
  name: string
  level: number
  isInView: boolean
  index: number
}

const SkillBar = ({ name, level, isInView, index }: SkillBarProps) => (
  <motion.div
    variants={itemVariants}
    className="group"
  >
    {/* Label row — skill name on left, percentage on right */}
    <div className="flex justify-between items-center mb-2">
      <span className="text-white text-sm font-medium">{name}</span>
      <span className="text-[#00CFAD] text-xs font-mono">{level}%</span>
    </div>

    {/* Track — the grey background bar */}
    <div className="h-1.5 bg-[#152424] rounded-full overflow-hidden">
      {/* Fill — animates width when section comes into view */}
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#00CFAD] to-[#80E8D8]"
        initial={{ width: 0 }}
        animate={{ width: isInView ? `${level}%` : 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          // Each bar fills in one after another (staggered by index)
          delay: 0.2 + index * 0.07,
        }}
      />
    </div>
  </motion.div>
)

// ─── Tech Icon Card ───────────────────────────────────────────
// Small card showing a technology name with its brand color
interface TechIconCardProps {
  name: string
  color: string
  index: number
}

const TechIconCard = ({ name, color, index }: TechIconCardProps) => (
  <motion.div
    variants={itemVariants}
    // Subtle floating animation — each card bobs at a different speed
    animate={{
      y: [0, index % 2 === 0 ? -6 : 6, 0],
    }}
    transition={{
      duration: 3 + (index % 3) * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.15,
    }}
    className="
      flex flex-col items-center justify-center gap-2
      p-4 rounded-xl
      border border-[#00CFAD]/15 bg-[#0E1A1C]/80
      hover:border-[#00CFAD]/50 hover:bg-[#152424]
      transition-all duration-300 cursor-default
      group
    "
  >
    {/* Colored dot representing the tech's brand color */}
    <div
      className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-125"
      style={{ backgroundColor: color }}
    />
    <span className="text-[#6B9E94] text-xs font-mono group-hover:text-white transition-colors duration-300">
      {name}
    </span>
  </motion.div>
)

// ─── Main Component ───────────────────────────────────────────
const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' })

  // Active category filter tab — 'All' by default
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All')

  // Filter skills based on active category tab
  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-[#080E10] py-24 md:py-32 overflow-hidden"
    >
      {/* ── Background glow ───────────────────────────────── */}
      <div className="
        absolute top-1/2 left-0 -translate-y-1/2
        w-[500px] h-[500px] rounded-full
        bg-[#00CFAD]/3 blur-3xl pointer-events-none
      " />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        <SectionHeading
          label="02. WHAT I KNOW"
          title="My"
          highlight="Skills"
        />

        {/* ── Main grid — skill bars left, tech icons right ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── LEFT — Skill Bars ─────────────────────────── */}
          <div>
            {/* Category filter tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-mono
                    border transition-all duration-300
                    ${activeCategory === cat
                      ? 'bg-[#00CFAD] text-[#080E10] border-[#00CFAD]'
                      : 'text-[#6B9E94] border-[#00CFAD]/20 hover:border-[#00CFAD]/50'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill bars — re-render with animation on category change */}
            <motion.div
              key={activeCategory} // key change forces re-mount = re-animation
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col gap-6"
            >
              {filteredSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  isInView={isInView}
                  index={index}
                />
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Tech Stack Grid ───────────────────── */}
          <div>
            <p className="text-[#6B9E94] font-mono text-sm tracking-widest mb-8">
              TECHNOLOGIES I WORK WITH
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-3 sm:grid-cols-4 gap-4"
            >
              {techStack.map((tech, index) => (
                <TechIconCard
                  key={tech.name}
                  name={tech.name}
                  color={tech.color}
                  index={index}
                />
              ))}
            </motion.div>

            {/* ── Extra info card ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="
                mt-8 p-5 rounded-xl
                border border-[#00CFAD]/15 bg-[#0E1A1C]/60
              "
            >
              {/* Terminal-style text block */}
              <p className="text-[#00CFAD] font-mono text-xs mb-2">
                ~/hamza <span className="text-[#6B9E94]">$</span> current_focus
              </p>
              <p className="text-white text-sm leading-relaxed">
                Currently deepening expertise in{' '}
                <span className="text-[#00CFAD]">Three.js</span>,{' '}
                <span className="text-[#00CFAD]">React Three Fiber</span>, and{' '}
                <span className="text-[#00CFAD]">advanced animations</span> —
                building immersive web experiences that push the boundaries
                of what's possible in the browser.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills