/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['content/*.vue', 'popup/*.vue'],
  theme: {
    extend: {}
  },
  plugins: [
    require('daisyui'),
  ]
}
