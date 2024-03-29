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
      },
      height: {
        'screen-2/6': '33vh',
        'screen-3/6': '50vh',
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
