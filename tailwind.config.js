/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#080E10',
          900: '#0E1A1C',
          800: '#152424',
          700: '#1C2E30',
        },
        cyan: {
          brand: '#00CFAD',
          light: '#2ECFB0',
          pale:  '#80E8D8',
        },
        yellow: {
          brand: '#F5C842',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}