/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        agdasaima: ['Agdasaima', 'sans-serif'],
      },
      colors: {
        light: '#fff',
        dark: '#000',
      },
      fontSize: {
        'hero': '8rem',
        'link': '6rem',
      },
      letterSpacing: {
        'hero': '-0.5rem',
      },
      screens: {
        'md': '1000px',
      },
    },
  },
  plugins: [],
}
