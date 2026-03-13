/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f06543', // Core Coral/Orange from image
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        edu: {
          yellow: '#f9d876',
          purple: '#c6b3e6',
          blue: '#a9dbe6',
          dark: '#2d2d2d',
          bg: '#fdfcfb',
          border: '#1a1a1b',
        }
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
       animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
