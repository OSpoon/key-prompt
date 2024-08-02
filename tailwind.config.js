/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['popup/*.vue'],
  theme: {
    extend: {}
  },
  plugins: [
    require('daisyui')
  ]
}
