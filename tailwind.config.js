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
        dark: {
          950: '#06060a',
          900: '#0b0b13',
          850: '#10101c',
          800: '#151526',
          700: '#1f1f35',
          600: '#2d2d4c'
        },
        lime: {
          neon: '#a3e635',
          light: '#bef264',
          hover: '#bef264',
          dim: '#65a30d',
          glow: 'rgba(163, 230, 53, 0.25)'
        },
        purple: {
          neon: '#a78bfa',
          deep: '#7c3aed',
          glow: 'rgba(167, 139, 250, 0.25)'
        },
        cyan: {
          neon: '#38bdf8'
        },
        amber: {
          moon: '#fbbf24'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Space Grotesk', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'lime-glow': '0 0 20px rgba(163, 230, 53, 0.25)',
        'lime-glow-lg': '0 0 35px rgba(163, 230, 53, 0.35)',
        'purple-glow': '0 0 20px rgba(167, 139, 250, 0.25)',
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}
