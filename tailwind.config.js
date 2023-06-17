/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Instrument Serif', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        copper: {
          300: '#e8b48a',
          400: '#d4956a',
          500: '#c07a4e',
          600: '#a66339',
          700: '#7c4a2b',
        },
        surface: {
          DEFAULT: '#0c0a09',
          raised: 'rgba(255, 255, 255, 0.03)',
          hover: 'rgba(255, 255, 255, 0.06)',
        },
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'scroll': 'scroll 30s linear infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
