const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './public/ncsassets/**/*.js',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        serif: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
        icon: ['icon', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'ncs-tweed': "url('ncsassets/img/tweed.png')",
        'ncs-flourish': "url('ncsassets/img/flourish.png')"
      },
      colors: {
        'ncs-brown': '#926602',
        'ncs-light-gray': {
          200: "#aaaaaa"
        },
        'ncs-gray': {
          200: "#3f4244",
          300: "#383b3d",
          400: "#313436",
          500: "#262a2e",
          600: "#232428",
          700: "#1f2326",
          900: "#131315"

        },
        'ncs-yellow': {
          200: "#f5f8cc"
        }
      },
      maxWidth: {
        'ncs-content': "998px"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
