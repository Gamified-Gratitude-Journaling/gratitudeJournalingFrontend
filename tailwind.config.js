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
        hoverColor: '#0088a9',
        pageBody: '#ECEFF1',
      },
      width: {
        'inf': '1000%',
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
