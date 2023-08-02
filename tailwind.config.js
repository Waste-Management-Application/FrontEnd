/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'dark-purple': '#081A51',
        'light-white': 'rgba(255,255,255,0.17)',
        g1: '#dad7cd',
        g2: '#a3b18a',
        g3: '#588157',
        g4: '#3a5a40',
        g5: '#344e41'
      }
    },
  },
  plugins: [],
};

export default tailwindConfig;
