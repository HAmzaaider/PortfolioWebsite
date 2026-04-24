// ─── Experience & Education data ──────────────────────────────

export interface ExperienceItem {
  id: number
  type: 'work' | 'education'   // controls which tab it appears in
  role: string
  company: string
  location: string
  duration: string
  period: string                // e.g. "2022 — Present"
  description: string[]         // bullet points of responsibilities
  tech: string[]                // technologies used in this role
  current: boolean              // true = shows "Current" badge
}

export const experiences: ExperienceItem[] = [
  // ── Work Experience ──────────────────────────────────────────
  {
    id: 1,
    type: 'work',
    role: 'Frontend Developer',
    company: 'TechNova Solutions',
    location: 'Rawalpindi, Pakistan',
    duration: '1 year 6 months',
    period: '2023 — Present',
    current: true,
    description: [
      'Built and maintained responsive React applications serving thousands of users daily.',
      'Reduced page load time by 40% through code splitting and lazy loading strategies.',
      'Collaborated with designers to implement pixel-perfect UI components.',
      'Led migration from JavaScript to TypeScript across the entire frontend codebase.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
  },
  {
    id: 2,
    type: 'work',
    role: 'Junior Frontend Developer',
    company: 'Freelance / Remote',
    location: 'Remote',
    duration: '8 months',
    period: '2022 — 2023',
    current: false,
    description: [
      'Designed and developed 10+ client websites from scratch using React and Tailwind.',
      'Integrated third-party APIs including payment gateways and mapping services.',
      'Maintained consistent communication with clients through full project lifecycle.',
    ],
    tech: ['React', 'JavaScript', 'CSS', 'Figma', 'WordPress'],
  },

  // ── Education ────────────────────────────────────────────────
  {
    id: 3,
    type: 'education',
    role: 'BS Computer Science',
    company: 'NUST',
    location: 'Rawalpindi, Pakistan',
    duration: '4 years',
    period: '2023 — 2027',
    current: true,
    description: [
     
      'Completed capstone project — a full-stack social platform with real-time features.',
      'Active member of the university coding club and hackathon team.',
    ],
    tech: ['Data Structures', 'Algorithms', 'OOP', 'Databases', 'Networks'],
  },
  {
    id: 4,
    type: 'education',
    role: 'Frontend Development Bootcamp',
    company: 'Online / Self-taught',
    location: 'Remote',
    duration: '6 months',
    period: '2022',
    current: false,
    description: [
      'Completed intensive React and modern JavaScript curriculum.',
      'Built 15+ projects including e-commerce apps, dashboards, and landing pages.',
      'Earned certifications in React, TypeScript, and Responsive Web Design.',
    ],
    tech: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
  },
]