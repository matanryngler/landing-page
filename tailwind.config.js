/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        term: {
          bg: '#0c0c0c',
          surface: '#161616',
          chrome: '#1e1e1e',
          border: '#2a2a2a',
          text: '#d4d4d4',
          muted: '#737373',
          dim: '#404040',
          green: '#4ade80',
          amber: '#fbbf24',
          blue: '#60a5fa',
          red: '#f87171',
          cyan: '#22d3ee',
        },
      },
      animation: {
        'blink': 'blink 1.2s step-end infinite',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
