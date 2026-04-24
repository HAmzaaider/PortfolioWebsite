import { useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { skills, techStack, skillCategories, type SkillCategory } from '@data/skills'
import SectionBorder from '@components/ui/SectionBorder'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

interface SkillBarProps { name: string; level: number; isInView: boolean; index: number }

const SkillBar = ({ name, level, isInView, index }: SkillBarProps) => (
  <motion.div variants={itemVariants} className="group">
    <div className="flex justify-between items-center mb-2">
      <span className="text-navy-800 text-base font-semibold">{name}</span>
      <span className="text-mustard-600 text-sm font-mono font-bold">{level}%</span>
    </div>
    <div className="h-2 bg-navy-800/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-mustard-600 to-mustard-400"
        initial={{ width: 0 }}
        animate={{ width: isInView ? `${level}%` : 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 + index * 0.07 }}
      />
    </div>
  </motion.div>
)

interface TechIconCardProps { name: string; color: string; index: number }

const TechIconCard = ({ name, color, index }: TechIconCardProps) => (
  <motion.div
    variants={itemVariants}
    animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
    transition={{ duration: 3 + (index % 3) * 0.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-navy-800/12 bg-cream-50 hover:border-mustard-600/40 hover:shadow-[0_4px_20px_rgba(201,106,0,0.12)] transition-all duration-300 group cursor-default"
  >
    <div className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ backgroundColor: color }} />
    <span className="text-navy-800/60 text-xs font-mono font-semibold group-hover:text-navy-800 transition-colors duration-300">{name}</span>
  </motion.div>
)

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' })
  const barsRef = useRef<HTMLDivElement>(null)
  const barsInView = useInView(barsRef, { once: true, margin: '-20% 0px -30% 0px' })
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All')
  const filteredSkills = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory)

  return (
    // ── cream-100: slightly warmer/deeper than hero ───────────
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-cream-100 py-24 md:py-32 overflow-hidden"
    >
      <SectionBorder isInView={isInView} theme="light" />

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-navy-800/4 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Heading — Rule applied */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="font-mono text-sm font-semibold text-mustard-600 tracking-widest mb-3">02. WHAT I KNOW</p>
          <h2 className="text-4xl md:text-5xl font-black text-navy-800" style={{ fontFamily: 'Playfair Display, serif' }}>
            My{' '}
            <span className="text-gradient inline-block italic">Skills</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-0.5 bg-mustard-600" />
            <div className="w-3 h-0.5 bg-mustard-600/50" />
            <div className="w-1.5 h-0.5 bg-mustard-600/25" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT — Bars */}
          <div>
            <div className="flex gap-2 mb-8 flex-wrap">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-mono font-bold border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-mustard-600 text-white border-mustard-600 shadow-[0_4px_16px_rgba(201,106,0,0.3)]'
                      : 'text-navy-800/60 border-navy-800/15 hover:border-mustard-600/50 hover:text-mustard-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div
              ref={barsRef}
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate={barsInView ? 'visible' : 'hidden'}
              className="flex flex-col gap-7"
            >
              {filteredSkills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} isInView={barsInView} index={index} />
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Tech grid */}
          <div>
            <p className="text-navy-800/50 font-mono text-sm font-bold tracking-widest mb-8">TECHNOLOGIES I WORK WITH</p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-3 sm:grid-cols-4 gap-3"
            >
              {techStack.map((tech, index) => (
                <TechIconCard key={tech.name} name={tech.name} color={tech.color} index={index} />
              ))}
            </motion.div>

            {/* Terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 p-5 rounded-xl border border-mustard-600/20 bg-cream-50"
            >
              <p className="text-mustard-600 font-mono text-sm font-bold mb-2">
                ~/hamza <span className="text-navy-800/40">$</span> current_focus
              </p>
              <p className="text-navy-800/75 text-base leading-relaxed">
                Currently deepening expertise in{' '}
                <span className="text-mustard-600 font-bold">Three.js</span>,{' '}
                <span className="text-mustard-600 font-bold">React Three Fiber</span>, and{' '}
                <span className="text-mustard-600 font-bold">advanced animations</span> —
                building immersive web experiences that push the boundaries of what's possible in the browser.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills