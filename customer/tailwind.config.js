/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        g1: '#dad7cd',
        g2: '#a3b18a',
        g3: '#588157',
        g4: '#3a5a40',
        g5: '#344e41'
      }
    },
  },
  plugins: [],
}

