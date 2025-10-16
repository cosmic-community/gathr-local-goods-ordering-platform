/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5F3F',
          dark: '#1F4429',
          light: '#3D7F5F',
        },
        accent: {
          DEFAULT: '#D4A574',
          dark: '#B88D5E',
          light: '#E5C29F',
        },
        background: '#F5F1E8',
        surface: '#FFFFFF',
        warning: '#F59E0B',
        success: '#10B981',
        danger: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}