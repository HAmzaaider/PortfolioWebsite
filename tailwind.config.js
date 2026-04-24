/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FFF4DC',
          100: '#FEE8A0',
          200: '#FDDEA0',
        },
        navy: {
          900: '#060F1E',  // darkest — Projects + Footer
          800: '#0D2545',  // dark    — About + Contact
          700: '#12306B',
          600: '#1A3A6B',
          400: '#4A7FC1',
        },
        mustard: {
          600: '#C96A00',
          500: '#E8920A',
          400: '#F5B955',
          300: '#FDDEA0',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono:  ['Fira Code', 'monospace'],
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
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