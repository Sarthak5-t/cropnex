/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          light: '#4CAF50',
          dark: '#1B5E20'
        },
        secondary: {
          DEFAULT: '#FBC02D',
          light: '#FFF176',
          dark: '#F57F17'
        },
        accent: {
          DEFAULT: '#66BB6A',
          light: '#A5D6A7',
          dark: '#388E3C'
        },
        surface: '#FAFAFA',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'glow': '0 0 20px rgba(76, 175, 80, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://images.unsplash.com/photo-1595841696677-6489ff3f8b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }
    },
  },
  plugins: [],
}
