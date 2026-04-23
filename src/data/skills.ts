// ─── Skills data — edit values to match your actual skill levels ──

export interface Skill {
  name: string
  level: number        // percentage 0-100
  category: string
}

export interface TechIcon {
  name: string
  color: string        // accent color for the icon label
}

// ─── Categorized skill bars ───────────────────────────────────
export const skills: Skill[] = [
  // Frontend
  { name: 'React',       level: 90, category: 'Frontend' },
  { name: 'TypeScript',  level: 85, category: 'Frontend' },
  { name: 'JavaScript',  level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS',level: 88, category: 'Frontend' },
  { name: 'HTML & CSS',  level: 95, category: 'Frontend' },
  { name: 'Framer Motion',level: 75, category: 'Frontend' },

  // Tools & Others
  { name: 'Git & GitHub', level: 85, category: 'Tools' },
  { name: 'Vite',         level: 80, category: 'Tools' },
  { name: 'Figma',        level: 70, category: 'Tools' },
  { name: 'REST APIs',    level: 82, category: 'Tools' },
]

// ─── Tech stack icons shown as a floating grid ────────────────
export const techStack: TechIcon[] = [
  { name: 'React',      color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'HTML5',      color: '#E34F26' },
  { name: 'CSS3',       color: '#1572B6' },
  { name: 'Tailwind',   color: '#06B6D4' },
  { name: 'Git',        color: '#F05032' },
  { name: 'GitHub',     color: '#ffffff' },
  { name: 'Vite',       color: '#646CFF' },
  { name: 'Figma',      color: '#F24E1E' },
  { name: 'Node.js',    color: '#339933' },
  { name: 'VS Code',    color: '#007ACC' },
]

// ─── Skill categories for the filter tabs ─────────────────────
export const skillCategories = ['All', 'Frontend', 'Tools'] as const
export type SkillCategory = typeof skillCategories[number]