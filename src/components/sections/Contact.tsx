import { useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import useWeb3Forms from '@web3forms/react'
import { web3FormsConfig, contactInfo, socialLinks } from '@data/contact'

// ─── Types ────────────────────────────────────────────────────
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

// ─── SVG Icons ────────────────────────────────────────────────
const Icons = {
  email: <svg className="w-5 h-5" />,
  location: <svg className="w-5 h-5" />,
  status: <svg className="w-5 h-5" />,
  github: <svg className="w-5 h-5" />,
  linkedin: <svg className="w-5 h-5" />,
}

// ─── Form Input Component ─────────────────────────────────────
interface FormInputProps {
  label: string
  name: keyof FormData
  type?: string
  value: string
  error?: string
  placeholder: string
  multiline?: boolean
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void
}

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  error,
  placeholder,
  multiline = false,
  onChange,
}: FormInputProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#6B9E94] text-xs font-mono tracking-wide">
      {label}
      <span className="text-[#00CFAD] ml-1">*</span>
    </label>

    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-[#152424]/50 rounded-lg px-4 py-3 text-white"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#152424]/50 rounded-lg px-4 py-3 text-white"
      />
    )}

    {error && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-400 text-xs"
      >
        {error}
      </motion.p>
    )}
  </div>
)

// ─── Main Component ───────────────────────────────────────────
const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  const [formData, setFormData] =
    useState<FormData>({
      name: '',
      email: '',
      subject: '',
      message: '',
    })

  const [errors, setErrors] =
    useState<FormErrors>({})

  const [status, setStatus] =
    useState<FormStatus>('idle')

  // ── Web3Forms hook ────────────────────────────────────────
  const { submit } = useWeb3Forms({
    access_key: web3FormsConfig.accessKey,

    settings: {
      from_name: 'Portfolio Contact Form',
      subject: 'New message from your portfolio',
    },

    onSuccess: () => {
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    },

    onError: () => {
      setStatus('error')
    },
  })

  // ── Input change handler ──────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ── Validation ────────────────────────────────────────────
  const validate = () => true

  // ── Submit handler ────────────────────────────────────────
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!validate()) return

    setStatus('loading')

    await submit(formData)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0E1A1C] py-24"
    >
      {/* ── Background decoration ─────────────────────────── */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? { opacity: 1 }
              : {}
          }
        >
          <SectionHeading
            label="05. LET'S TALK"
            title="Get In"
            highlight="Touch"
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* ── LEFT — Info Panel ─────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={
              isInView
                ? 'visible'
                : 'hidden'
            }
            className="lg:col-span-2"
          >

            {/* Social links */}
            <motion.div variants={itemVariants}>
              <p className="text-[#6B9E94] text-xs font-mono tracking-widest mb-4">
                FIND ME ON
              </p>

              <div className="flex flex-col gap-3">

                {/* GitHub */}
                <a
                  href="https://github.com/HAmzaaider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-4 p-4 rounded-xl
                    border border-[#00CFAD]/10 bg-[#080E10]/50
                  "
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    {Icons.github}
                  </div>

                  <div className="flex-1">
                    <p className="text-white text-sm">
                      GitHub
                    </p>

                    <p className="text-[#6B9E94] text-xs">
                      @HAmzaaider
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/hamza-haider-6b8063318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-4 p-4 rounded-xl
                    border border-[#00CFAD]/10 bg-[#080E10]/50
                  "
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    {Icons.linkedin}
                  </div>

                  <div className="flex-1">
                    <p className="text-white text-sm">
                      LinkedIn
                    </p>

                    <p className="text-[#6B9E94] text-xs">
                      Connect with me
                    </p>
                  </div>
                </a>

              </div>
            </motion.div>

          </motion.div>

          {/* ── RIGHT — Contact Form ───────────────────────── */}
          <motion.div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">

                <FormInput
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  error={errors.name}
                  placeholder="Hamza Haider"
                  onChange={handleChange}
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  error={errors.email}
                  placeholder="hamza@email.com"
                  onChange={handleChange}
                />

                <FormInput
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  error={errors.subject}
                  placeholder="Project idea..."
                  onChange={handleChange}
                />

                <FormInput
                  label="Message"
                  name="message"
                  value={formData.message}
                  error={errors.message}
                  placeholder="Tell me about it..."
                  multiline
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#00CFAD]"
                >
                  Send Message
                </button>

              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact