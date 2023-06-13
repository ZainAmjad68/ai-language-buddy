/** @type {import('tailwindcss').Config} */
module.exports = {
  content:['./src/**/*.{js,jsx,ts,tsx,svg}'],
  theme: {
    extend: {
      flex: {
        '2-1': '2 1 0%'
      }
    },
  },
  plugins: [],
}