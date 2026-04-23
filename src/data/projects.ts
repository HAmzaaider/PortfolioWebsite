// ─── Projects data — add/edit your real projects here ─────────

export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: ProjectCategory
  githubUrl: string
  liveUrl: string
  featured: boolean        // featured projects get a larger card
  status: 'Live' | 'In Progress' | 'Archived'
}

export const projectCategories = ['All', 'Frontend', 'Fullstack', '3D/Animation'] as const
export type ProjectCategory = typeof projectCategories[number]

export const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern developer portfolio with 3D animations, particle effects, and smooth scroll interactions.',
    longDescription: 'Built with React, TypeScript, Three.js and Framer Motion. Features a 3D particle scene, custom cursor, typewriter effect, and fully responsive layout.',
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind', 'Framer Motion'],
    category: 'Frontend',
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://yourportfolio.vercel.app',
    featured: true,
    status: 'Live',
  },
  {
    id: 2,
    title: 'E-Commerce Dashboard',
    description: 'A fully responsive admin dashboard with real-time analytics, charts, and product management.',
    longDescription: 'Complete admin panel featuring dynamic charts, inventory management, order tracking, and a clean dark UI.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Chart.js', 'REST API'],
    category: 'Fullstack',
    githubUrl: 'https://github.com/yourusername/dashboard',
    liveUrl: 'https://dashboard.vercel.app',
    featured: true,
    status: 'Live',
  },
  {
    id: 3,
    title: '3D Product Viewer',
    description: 'An interactive 3D product configurator built with React Three Fiber and real-time color customization.',
    longDescription: 'Users can rotate, zoom, and customize product colors in real time using a fully interactive 3D canvas.',
    tech: ['React', 'Three.js', 'R3F', 'Drei', 'GSAP'],
    category: '3D/Animation',
    githubUrl: 'https://github.com/yourusername/3d-viewer',
    liveUrl: 'https://3dviewer.vercel.app',
    featured: true,
    status: 'Live',
  },
  {
    id: 4,
    title: 'Weather App',
    description: 'A clean weather application with animated transitions, location search, and 7-day forecasts.',
    longDescription: 'Fetches live weather data from OpenWeather API with animated weather icons and smooth page transitions.',
    tech: ['React', 'TypeScript', 'Tailwind', 'OpenWeather API'],
    category: 'Frontend',
    githubUrl: 'https://github.com/yourusername/weather-app',
    liveUrl: 'https://weather.vercel.app',
    featured: false,
    status: 'Live',
  },
  {
    id: 5,
    title: 'Animated Landing Page',
    description: 'A high-converting SaaS landing page with scroll animations, parallax effects, and micro-interactions.',
    longDescription: 'Built for maximum visual impact with GSAP ScrollTrigger, parallax sections, and animated counters.',
    tech: ['React', 'GSAP', 'Tailwind', 'Framer Motion'],
    category: '3D/Animation',
    githubUrl: 'https://github.com/yourusername/landing',
    liveUrl: 'https://landing.vercel.app',
    featured: false,
    status: 'Live',
  },
  {
    id: 6,
    title: 'Task Manager App',
    description: 'A drag-and-drop task manager with kanban boards, priority labels, and local storage persistence.',
    longDescription: 'Full-featured task management with drag-and-drop kanban columns, color-coded priorities, and offline support.',
    tech: ['React', 'TypeScript', 'Tailwind', 'DnD Kit'],
    category: 'Fullstack',
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://tasks.vercel.app',
    featured: false,
    status: 'In Progress',
  },
]