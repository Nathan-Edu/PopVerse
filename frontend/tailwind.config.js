/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0e0e10',
        'cyber-gray': '#1f1f23',
        'neon-purple': '#a855f7',
        'neon-blue': '#3b82f6',
        'neon-green': '#22c55e',
        'neon-yellow': '#f59e0b',
        'neon-pink': '#ec4899',
        'neon-orange': '#f97316',
        'neon-red': '#ef4444',
        'neon-cyan': '#06b6d4',
        'neon-teal': '#14b8a6',
        'neon-lime': '#84cc16',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(255, 255, 255, 0.08)',
        'hover-neon': '0 0 25px 4px rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        shimmer: 'shimmer 3s infinite linear',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        }
      }
    }
  },
  plugins: [],
}
