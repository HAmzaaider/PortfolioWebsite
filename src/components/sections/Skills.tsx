import { useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { skills, techStack, skillCategories, type SkillCategory } from '@data/skills'

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// ★ Skills entrance: stagger up from bottom + subtle scale — feels like bars rising
const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─── Section Heading ──────────────────────────────────────────
interface SectionHeadingProps {
  label: string; title: string; highlight: string
}

const SectionHeading = ({ label, title, highlight }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16 text-center">
    <p className="font-mono text-sm font-semibold text-mustard-600 tracking-widest mb-3">{label}</p>
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

// ─── Skill Bar ────────────────────────────────────────────────
interface SkillBarProps {
  name: string; level: number; isInView: boolean; index: number
}

const SkillBar = ({ name, level, isInView, index }: SkillBarProps) => (
  <motion.div variants={itemVariants} className="group">
    <div className="flex justify-between items-center mb-2">
      {/* ★ font-semibold for skill name clarity */}
      <span className="text-navy-800 text-sm font-semibold">{name}</span>
      <span className="text-mustard-600 text-xs font-mono font-semibold">{level}%</span>
    </div>
    {/* Track */}
    <div className="h-1.5 bg-navy-800/10 rounded-full overflow-hidden">
      {/* Fill — animates from 0 to level% on scroll */}
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-mustard-600 to-mustard-400"
        initial={{ width: 0 }}
        animate={{ width: isInView ? `${level}%` : 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.2 + index * 0.07,
        }}
      />
    </div>
  </motion.div>
)

// ─── Tech Icon Card ───────────────────────────────────────────
interface TechIconCardProps {
  name: string; color: string; index: number
}

const TechIconCard = ({ name, color, index }: TechIconCardProps) => (
  <motion.div
    variants={itemVariants}
    animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
    transition={{
      duration: 3 + (index % 3) * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.12,
    }}
    className="
      flex flex-col items-center justify-center gap-2
      p-4 rounded-xl
      border border-navy-800/12
      bg-cream-100
      hover:border-mustard-600/40
      hover:shadow-[0_4px_20px_rgba(201,106,0,0.10)]
      transition-all duration-300
      group cursor-default
    "
  >
    {/* Brand color dot */}
    <div
      className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-125"
      style={{ backgroundColor: color }}
    />
    {/* ★ font-medium for tech name legibility */}
    <span className="text-navy-800/60 text-xs font-mono font-medium group-hover:text-navy-800 transition-colors duration-300">
      {name}
    </span>
  </motion.div>
)

// ─── Main Component ───────────────────────────────────────────
const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All')

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section
      id="skills"
      ref={sectionRef}
      // ★ Skills = cream-50 (step 3 of alternating pattern)
      className="relative min-h-screen bg-cream-50 py-24 md:py-32 overflow-x-hidden"
    >
      {/* ── Background decoration ─────────────────────────── */}
      <div className="
        absolute bottom-0 left-0
        w-[500px] h-[500px] rounded-full
        bg-navy-800/3 blur-3xl pointer-events-none
      " />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading label="02. WHAT I KNOW" title="My" highlight="Skills" />

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
                    px-4 py-1.5 rounded-full text-xs font-mono font-semibold
                    border transition-all duration-300
                    ${activeCategory === cat
                      ? 'bg-mustard-600 text-white border-mustard-600'
                      : 'text-navy-800/60 border-navy-800/15 hover:border-mustard-600/40 hover:text-mustard-600'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <motion.div
              key={activeCategory}
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
            <p className="text-navy-800/50 font-mono text-xs font-semibold tracking-widest mb-8">
              TECHNOLOGIES I WORK WITH
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-3 sm:grid-cols-4 gap-3"
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

            {/* Terminal info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="
                mt-8 p-5 rounded-xl
                border border-mustard-600/20
                bg-cream-100
              "
            >
              <p className="text-mustard-600 font-mono text-xs font-semibold mb-2">
                ~/hamza <span className="text-navy-800/40">$</span> current_focus
              </p>
              <p className="text-navy-800/75 text-sm leading-relaxed font-normal">
                Currently deepening expertise in{' '}
                <span className="text-mustard-600 font-semibold">Three.js</span>,{' '}
                <span className="text-mustard-600 font-semibold">React Three Fiber</span>, and{' '}
                <span className="text-mustard-600 font-semibold">advanced animations</span> —
                building immersive web experiences that push the boundaries
                of what's possible in the browser.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ★ Section divider — diagonal into Projects (cream-100 = #FEE8A0) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-12 block">
          <path d="M0,50 L1440,0 L1440,50 Z" fill="#FEE8A0" />
        </svg>
      </div>
    </section>
  )
}

export default Skills