import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { personalInfo } from '@data/personalInfo'
import profileImg from '@assets/images/profile.jpeg'
import SectionBorder from '@components/ui/SectionBorder'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

interface StatCardProps {
  value: string
  label: string
}

const StatCard = ({
  value,
  label,
}: StatCardProps) => (
  <motion.div
    variants={itemVariants}
    className="relative p-5 rounded-xl border border-cream-50/10 bg-navy-900/40 hover:border-mustard-600/40 hover:bg-navy-900/60 transition-all duration-300 group"
  >
    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-mustard-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Rule 2 & 3: gradient isolated */}
    <p
      className="text-3xl font-black mb-1"
      style={{
        fontFamily:
          'Playfair Display, serif',
      }}
    >
      <span className="text-gradient-light inline-block">
        {value}
      </span>
    </p>

    <p className="text-cream-50/50 text-xs font-mono font-medium tracking-wide">
      {label}
    </p>
  </motion.div>
)

const About = () => {
  const sectionRef =
    useRef<HTMLDivElement>(null)

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      margin: '-100px',
    }
  )

  return (
    // ── navy-800: first dark section ─────────────────────────
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-navy-800 py-24 md:py-32 overflow-hidden"
    >
      <SectionBorder
        isInView={isInView}
        theme="dark"
      />

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-mustard-600/5 blur-3xl pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            `radial-gradient(circle, #F5B955 1px, transparent 1px)`,
          backgroundSize:
            '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Profile */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={
              isInView
                ? 'visible'
                : 'hidden'
            }
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-mustard-600/15 animate-pulse-slow" />

            <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-cream-50/8" />

            <div className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border-4 border-navy-900 shadow-[0_20px_60px_rgba(201,106,0,0.25)]">
              <img
                src={profileImg}
                alt="Hamza Haider"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat:
                  Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 -right-4 md:bottom-4 md:right-0 bg-navy-900 border border-mustard-600/30 rounded-xl px-4 py-3 shadow-[0_8px_30px_rgba(201,106,0,0.15)]"
            >
              <p
                className="text-mustard-400 font-black text-lg leading-none"
                style={{
                  fontFamily:
                    'Playfair Display, serif',
                }}
              >
                2+
              </p>

              <p className="text-cream-50/50 text-xs font-mono font-medium mt-0.5">
                Years Exp.
              </p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat:
                  Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute -top-4 -left-4 md:top-4 md:left-0 bg-navy-900 border border-cream-50/10 rounded-xl px-4 py-3 shadow-[0_8px_30px_rgba(6,15,30,0.5)]"
            >
              <p className="text-cream-50 font-bold text-sm leading-none font-mono">
                React
              </p>

              <p className="text-mustard-400 text-xs font-mono font-medium mt-0.5">
                + TypeScript
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            variants={
              containerVariants
            }
            initial="hidden"
            animate={
              isInView
                ? 'visible'
                : 'hidden'
            }
            className="order-1 lg:order-2"
          >
            {/* Heading — Rule applied */}
            <div className="mb-12 md:mb-16">
              <p className="font-mono text-sm font-semibold text-mustard-400 tracking-widest mb-3">
                01. WHO AM I
              </p>

              <h2
                className="text-4xl md:text-5xl font-black text-cream-50 leading-tight"
                style={{
                  fontFamily:
                    'Playfair Display, serif',
                }}
              >
                About{' '}
                <span className="text-gradient-light inline-block italic">
                  Me
                </span>
              </h2>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-0.5 bg-mustard-500" />
                <div className="w-3 h-0.5 bg-mustard-500/50" />
                <div className="w-1.5 h-0.5 bg-mustard-500/25" />
              </div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-cream-50/75 text-lg leading-relaxed mb-5 font-normal"
            >
              {
                personalInfo.bio
                  .paragraph1
              }
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-cream-50/75 text-lg leading-relaxed mb-8 font-normal"
            >
              {
                personalInfo.bio
                  .paragraph2
              }
            </motion.p>

            {/* Info rows */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 font-mono text-base"
            >
              {[
                {
                  label:
                    'Location',
                  value:
                    personalInfo.location,
                  colored:
                    false,
                },
                {
                  label:
                    'Status',
                  value:
                    personalInfo.availability,
                  colored:
                    true,
                },
                {
                  label:
                    'Focus',
                  value:
                    'Frontend Dev',
                  colored:
                    false,
                },
                {
                  label:
                    'Email',
                  value:
                    personalInfo.email,
                  colored:
                    false,
                },
              ].map((item) => (
                <div
                  key={
                    item.label
                  }
                  className="flex items-center gap-2"
                >
                  <span className="text-mustard-400 text-xs">
                    ▸
                  </span>

                  <span className="text-cream-50/50 font-medium">
                    {
                      item.label
                    }
                    :
                  </span>

                  <span
                    className={`truncate font-semibold ${
                      item.colored
                        ? 'text-mustard-400'
                        : 'text-cream-50'
                    }`}
                  >
                    {
                      item.value
                    }
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Download CV — dark bg button */}
            <motion.div
              variants={itemVariants}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-secondary inline-flex items-center gap-3"
              >
                Download CV

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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={
            containerVariants
          }
          initial="hidden"
          animate={
            isInView
              ? 'visible'
              : 'hidden'
          }
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 md:mt-28"
        >
          {personalInfo.stats.map(
            (stat) => (
              <StatCard
                key={
                  stat.label
                }
                value={
                  stat.value
                }
                label={
                  stat.label
                }
              />
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default About