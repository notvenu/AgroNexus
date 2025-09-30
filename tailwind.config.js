/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This line enables dark mode based on a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors (can remain as is or be adjusted)
        primary: '#22c55e', 
        'primary-dark': '#16a34a',
        secondary: '#f97316', 
        background: '#f1f5f9', 
        surface: '#ffffff',
        text: '#0f172a', 
        'text-muted': '#64748b',

        // Dark theme colors
        dark: {
          background: '#0f172a', // Slate-900
          surface: '#1e293b',    // Slate-800
          text: '#f1f5f9',       // Slate-100
          'text-muted': '#94a3b8', // Slate-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

