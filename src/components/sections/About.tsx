import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { personalInfo } from '@data/personalInfo'
import profileImg from '@assets/images/profile.jpeg'

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ★ About entrance: slides in from LEFT — distinct from Hero's fade-up
const leftVariants: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─── Section Heading ──────────────────────────────────────────
interface SectionHeadingProps {
  label:     string
  title:     string
  highlight: string
}

const SectionHeading = ({ label, title, highlight }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16">
    <p className="font-mono text-sm font-semibold text-mustard-600 tracking-widest mb-3">
      {label}
    </p>
    <h2
      className="text-4xl md:text-5xl font-black text-navy-800 leading-tight"
      style={{ fontFamily: 'Playfair Display, serif' }}
    >
      {title}{' '}
      <span className="text-gradient italic">{highlight}</span>
    </h2>

    {/* Decorative lines */}
    <div className="flex items-center gap-3 mt-4">
      <div className="w-12 h-0.5 bg-mustard-600" />
      <div className="w-3 h-0.5 bg-mustard-600/50" />
      <div className="w-1.5 h-0.5 bg-mustard-600/25" />
    </div>
  </div>
)

// ─── Stat Card ────────────────────────────────────────────────
interface StatCardProps {
  value: string
  label: string
}

const StatCard = ({ value, label }: StatCardProps) => (
  <motion.div
    variants={itemVariants}
    className="
      relative p-5 rounded-xl
      border border-mustard-600/20
      bg-cream-50
      hover:border-mustard-600/50
      hover:bg-cream-50
      hover:shadow-[0_4px_20px_rgba(201,106,0,0.10)]
      transition-all duration-300
      group
    "
  >
    {/* Accent dot top right */}
    <div className="
      absolute top-3 right-3 w-1.5 h-1.5 rounded-full
      bg-mustard-600 opacity-0 group-hover:opacity-100
      transition-opacity duration-300
    " />

    <p
      className="text-3xl font-black text-gradient mb-1"
      style={{ fontFamily: 'Playfair Display, serif' }}
    >
      {value}
    </p>

    {/* ★ font-medium for label readability on cream-100 bg */}
    <p className="text-navy-800/60 text-xs font-mono font-medium tracking-wide">
      {label}
    </p>
  </motion.div>
)

// ─── Main Component ───────────────────────────────────────────
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px'
  })

  return (
    <section
      id="about"
      ref={sectionRef}
      // ★ About = cream-100 (step 2 of alternating bg pattern)
      className="relative min-h-screen bg-cream-100 py-24 md:py-32 overflow-x-hidden"
    >
      {/* ── Background decoration ─────────────────────────── */}
      <div className="
        absolute top-0 right-0
        w-[500px] h-[500px] rounded-full
        bg-mustard-600/5 blur-3xl pointer-events-none
      " />

      {/* ── Dot grid ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            `radial-gradient(circle, #C96A00 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT — Profile visual ────────────────────── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            {/* Outer pulsing ring */}
            <div className="
              absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px]
              rounded-full border border-mustard-600/20
              animate-pulse-slow
            " />

            {/* Middle ring */}
            <div className="
              absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px]
              rounded-full border border-navy-800/10
            " />

            {/* Profile image */}
            <div className="
              relative w-[220px] h-[220px] md:w-[280px] md:h-[280px]
              rounded-full overflow-hidden
              border-4 border-cream-50
              shadow-[0_20px_60px_rgba(201,106,0,0.2)]
            ">
              <img
                src={profileImg}
                alt="Hamza Haider"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating badge — Experience */}
            <motion.div
              animate={{ y: [0,-8,0] }}
              transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
              className="
                absolute -bottom-4 -right-4 md:bottom-4 md:right-0
                bg-cream-50 border border-mustard-600/25
                rounded-xl px-4 py-3
                shadow-[0_8px_30px_rgba(201,106,0,0.15)]
              "
            >
              <p
                className="text-mustard-600 font-black text-lg leading-none"
                style={{ fontFamily:'Playfair Display, serif' }}
              >
                2+
              </p>
              <p className="text-navy-800/60 text-xs font-mono font-medium mt-0.5">
                Years Exp.
              </p>
            </motion.div>

            {/* Floating badge — Stack */}
            <motion.div
              animate={{ y:[0,8,0] }}
              transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
              className="
                absolute -top-4 -left-4 md:top-4 md:left-0
                bg-cream-50 border border-navy-800/15
                rounded-xl px-4 py-3
                shadow-[0_8px_30px_rgba(13,37,69,0.1)]
              "
            >
              <p className="text-navy-800 font-bold text-sm leading-none font-mono">
                React
              </p>
              <p className="text-mustard-600 text-xs font-mono font-medium mt-0.5">
                + TypeScript
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Text content ──────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-1 lg:order-2"
          >
            <SectionHeading
              label="01. WHO AM I"
              title="About"
              highlight="Me"
            />

            {/* ★ font-normal (not thin) + stronger opacity for readability */}
            <motion.p
              variants={itemVariants}
              className="text-navy-800/75 text-base md:text-lg leading-relaxed mb-5 font-normal"
            >
              {personalInfo.bio.paragraph1}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-navy-800/75 text-base md:text-lg leading-relaxed mb-8 font-normal"
            >
              {personalInfo.bio.paragraph2}
            </motion.p>

            {/* Info rows */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 font-mono text-sm"
            >
              {[
                { label:'Location', value:personalInfo.location, colored:false },
                { label:'Status', value:personalInfo.availability, colored:true },
                { label:'Focus', value:'Frontend Dev', colored:false },
                { label:'Email', value:personalInfo.email, colored:false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-mustard-600 text-xs">▸</span>
                  {/* ★ font-medium on labels */}
                  <span className="text-navy-800/60 font-medium">
                    {item.label}:
                  </span>
                  <span className={`truncate font-semibold ${
                    item.colored
                      ? 'text-mustard-600'
                      : 'text-navy-800'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Download CV */}
<motion.div variants={itemVariants}>
  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center gap-3
      px-6 py-3 rounded-md
      border-2 border-navy-800 text-navy-800
      font-mono text-sm font-semibold
      hover:bg-navy-800 hover:text-white
      transition-all duration-300 group
      relative overflow-hidden
    "
  >
    <span className="
      absolute inset-0 bg-navy-800
      translate-y-full group-hover:translate-y-0
      transition-transform duration-300
    " />
    <span className="relative z-10">Download CV</span>
    <svg
      className="relative z-10 w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300"
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

        {/* ── Stats Row ─────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 md:mt-28"
        >
          {personalInfo.stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>

      {/* ★ Section divider — reverse diagonal into Skills (cream-50 = #FFF4DC) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-12 block">
          <path d="M0,0 L1440,50 L0,50 Z" fill="#FFF4DC" />
        </svg>
      </div>
    </section>
  )
}

export default About