/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}', // if your components are inside /src
  ],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-animate')],
}
