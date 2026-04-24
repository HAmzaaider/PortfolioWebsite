import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { web3FormsConfig, socialLinks } from "@data/contact";

// ─── Types ────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

// ─── Animation Variants ───────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Section Heading ──────────────────────────────────────────
interface SectionHeadingProps {
  label: string;
  title: string;
  highlight: string;
}

const SectionHeading = ({ label, title, highlight }: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16 text-center">
    <p className="font-mono text-sm text-mustard-600 tracking-widest mb-3">
      {label}
    </p>

    <h2
      className="text-4xl md:text-5xl font-black text-navy-800"
      style={{ fontFamily: "Playfair Display, serif" }}
    >
      {title} <span className="text-gradient italic">{highlight}</span>
    </h2>

    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="w-12 h-0.5 bg-mustard-600" />
      <div className="w-3 h-0.5 bg-mustard-600/50" />
      <div className="w-1.5 h-0.5 bg-mustard-600/25" />
    </div>
  </div>
);

// ─── SVG Icons ────────────────────────────────────────────────
const Icons = {
  email: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),

  location: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),

  status: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),

  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),

  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

// ─── Form Input ───────────────────────────────────────────────
interface FormInputProps {
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  error?: string;
  placeholder: string;
  multiline?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  error,
  placeholder,
  multiline = false,
  onChange,
}: FormInputProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-navy-800/50 text-xs font-mono tracking-wide">
      {label}
      <span className="text-mustard-600 ml-1">*</span>
    </label>

    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className={`
          w-full bg-cream-50 rounded-lg px-4 py-3
          text-navy-800 text-sm placeholder-navy-800/25
          border outline-none resize-none
          transition-all duration-300
          focus:bg-white
          ${
            error
              ? "border-red-400/50 focus:border-red-400"
              : "border-navy-800/10 focus:border-mustard-600/50"
          }
        `}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full bg-cream-50 rounded-lg px-4 py-3
          text-navy-800 text-sm placeholder-navy-800/25
          border outline-none
          transition-all duration-300
          focus:bg-white
          ${
            error
              ? "border-red-400/50 focus:border-red-400"
              : "border-navy-800/10 focus:border-mustard-600/50"
          }
        `}
      />
    )}

    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs font-mono"
      >
        {error}
      </motion.p>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────
const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  // ── Direct Web3Forms fetch ────────────────────────────────
  const sendForm = async (data: FormData) => {
    const payload = new FormData();

    payload.append("access_key", web3FormsConfig.accessKey);
    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("subject", data.subject);
    payload.append("message", data.message);
    payload.append("from_name", "Portfolio Contact Form");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });

    const result = await res.json();
    return result.success;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const e: FormErrors = {};

    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email";

    if (!formData.subject.trim()) e.subject = "Subject is required";

    if (!formData.message.trim()) e.message = "Message is required";
    else if (formData.message.trim().length < 20)
      e.message = "At least 20 characters";

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      const ok = await sendForm(formData);

      if (ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-cream-100 py-24 md:py-32 overflow-hidden"
    >
      <div
        className="
        absolute top-0 left-1/2 -translate-x-1/2
        w-[600px] h-[600px] rounded-full
        bg-mustard-600/5 blur-3xl pointer-events-none
      "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            label="05. LET'S TALK"
            title="Get In"
            highlight="Touch"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ── LEFT — Info ───────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Social links */}
            <motion.div variants={itemVariants}>
              <p className="text-navy-800/40 text-xs font-mono tracking-widest mb-4">
                FIND ME ON
              </p>

              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-4 p-4 rounded-xl
                      border border-navy-800/10
                      bg-white/75
                      hover:border-mustard-600/25
                      hover:bg-white
                      hover:shadow-[0_6px_24px_rgba(217,119,6,0.10)]
                      transition-all duration-300 group
                    "
                  >
                    <div
                      className="
                      w-10 h-10 rounded-lg flex-shrink-0
                      bg-mustard-600/10 text-mustard-600
                      flex items-center justify-center
                      group-hover:bg-mustard-600 group-hover:text-white
                      transition-all duration-300
                    "
                    >
                      {Icons[social.name.toLowerCase() as keyof typeof Icons]}
                    </div>

                    <div className="flex-1">
                      <p className="text-navy-800 text-sm font-medium">
                        {social.name}
                      </p>
                      <p className="text-navy-800/40 text-xs">{social.label}</p>
                    </div>

                    <svg
                      className="w-4 h-4 text-navy-800/20 group-hover:text-mustard-600 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div
              className="
              p-6 md:p-8 rounded-2xl
              border border-mustard-600/18
              bg-white/90
              shadow-[0_10px_40px_rgba(27,58,107,0.08)]
            "
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center"
                >
                  <h3
                    className="text-2xl font-black"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Message Sent!
                  </h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        type="email"
                      />
                    </div>

                    <FormInput
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      error={errors.subject}
                      placeholder="Project collaboration"
                      onChange={handleChange}
                    />

                    <FormInput
                      label="Message"
                      name="message"
                      value={formData.message}
                      error={errors.message}
                      placeholder="Tell me about your project..."
                      multiline
                      onChange={handleChange}
                    />

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      className="
                        w-full py-4 rounded-xl
                        bg-mustard-600 text-white
                        font-mono font-semibold text-sm
                      "
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
