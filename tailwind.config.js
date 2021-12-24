const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.{html,js}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      }
    },
    container: {
      center: true,
    },
  },
  variants: { 
    extend: {},
  },
  plugins: [],
}
