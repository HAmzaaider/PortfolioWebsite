import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { personalInfo } from '@data/personalInfo'
import profileImg from '@assets/images/profile.jpeg'

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─── Section Heading Component (reusable) ─────────────────────
interface SectionHeadingProps {
  label: string
  title: string
  highlight: string
}

const SectionHeading = ({ label, title, highlight }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16">
    <p className="text-[#00CFAD] font-mono text-sm tracking-widest mb-3">
      {label}
    </p>
    <h2 className="text-4xl md:text-5xl font-bold text-white">
      {title}{' '}
      <span className="text-gradient">{highlight}</span>
    </h2>
    <div className="flex items-center gap-3 mt-4">
      <div className="w-12 h-0.5 bg-[#00CFAD]" />
      <div className="w-3 h-0.5 bg-[#00CFAD]/50" />
      <div className="w-1.5 h-0.5 bg-[#00CFAD]/25" />
    </div>
  </div>
)

// ─── Stat Card ────────────────────────────────────────────────
interface StatCardProps {
  value: string
  label: string
  index: number
}

const StatCard = ({ value, label, index }: StatCardProps) => (
  <motion.div
    variants={itemVariants}
    custom={index}
    className="
      relative p-5 rounded-lg
      border border-[#00CFAD]/15
      bg-[#0E1A1C]/60
      hover:border-[#00CFAD]/40
      hover:bg-[#0E1A1C]
      transition-all duration-300
      group
    "
  >
    <div className="
      absolute top-3 right-3 w-1.5 h-1.5 rounded-full
      bg-[#00CFAD] opacity-0 group-hover:opacity-100
      transition-opacity duration-300
    " />
    <p className="text-3xl font-bold text-gradient mb-1">{value}</p>
    <p className="text-[#6B9E94] text-xs font-mono tracking-wide">{label}</p>
  </motion.div>
)

// ─── Main Component ───────────────────────────────────────────
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0E1A1C] py-24 md:py-32 overflow-hidden"
    >
      <div className="
        absolute top-1/2 right-0 -translate-y-1/2
        w-[600px] h-[600px] rounded-full
        bg-[#00CFAD]/3 blur-3xl pointer-events-none
      " />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-[#00CFAD]/10 animate-pulse-slow" />
            <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-[#00CFAD]/20" />

            <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border-2 border-[#00CFAD]/40">
              <img
                src={profileImg}
                alt="Hamza Haider"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 md:bottom-4 md:right-0 bg-[#080E10] border border-[#00CFAD]/30 rounded-lg px-4 py-3 shadow-lg"
            >
              <p className="text-[#00CFAD] font-bold text-lg">2+</p>
              <p className="text-[#6B9E94] text-xs">Years Exp.</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-4 -left-4 md:top-4 md:left-0 bg-[#080E10] border border-[#00CFAD]/30 rounded-lg px-4 py-3 shadow-lg"
            >
              <p className="text-[#00CFAD] font-bold text-sm">React</p>
              <p className="text-[#6B9E94] text-xs">+ TypeScript</p>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <SectionHeading label="01. WHO AM I" title="About" highlight="Me" />

            <motion.p variants={itemVariants} className="text-[#6B9E94] mb-5">
              {personalInfo.bio.paragraph1}
            </motion.p>

            <motion.p variants={itemVariants} className="text-[#6B9E94] mb-8">
              {personalInfo.bio.paragraph2}
            </motion.p>

            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-3 mb-10 font-mono text-sm">
              <div>Location: {personalInfo.location}</div>
              <div>Status: {personalInfo.availability}</div>
              <div>Focus: Frontend Dev</div>
              <div>Email: {personalInfo.email}</div>
            </motion.div>

            {/* ✅ FIXED BUTTON */}
            <motion.div variants={itemVariants}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-[#00CFAD]/10 border border-[#00CFAD]/30 text-[#00CFAD] font-mono text-sm hover:bg-[#00CFAD] hover:text-[#080E10] transition-all duration-300 group"
              >
                Download CV
                <svg
                  className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {personalInfo.stats.map((stat, index) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default About