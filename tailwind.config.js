/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FFFBF0',
          100: '#FEF3C7',
          200: '#FDE68A',
        },
        navy: {
          900: '#0F1B35',
          800: '#1B3A6B',
          700: '#1E4080',
          600: '#2563EB',
          400: '#60A5FA',
        },
        mustard: {
          600: '#D97706',
          500: '#F59E0B',
          400: '#FCD34D',
          300: '#FDE68A',
        },
      },
      fontFamily: {
        sans:     ['Inter', 'sans-serif'],
        serif:    ['Playfair Display', 'serif'],
        mono:     ['Fira Code', 'monospace'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'pulse-slow':  'pulse 4s ease-in-out infinite',
        'spin-slow':   'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
}