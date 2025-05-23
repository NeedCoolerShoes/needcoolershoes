const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './app/components/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        serif: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
        icon: ['icon', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'ncs-tweed': "url('/tweed.png')",
        'ncs-flourish': "url('/flourish.png')",
        'ncs-flourish-side': "url('/flourish-side.png')",
        'ncs-grid': "url('/grid-dark.png')",
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
        'ncs-dark': {
          100: "#D4E2F1",
          300: "#6F8498",
          500: "#374451",
          600: "#32404E",
          700: "#222E3A",
          800: "#17222D",
        },
        'ncs-header': {
          'base': "#da6d11",
          'hover': "#be4f2f",
          'selected': "#ac2d3a"
        },
        'ncs-yellow': {
          200: "#f5f8cc",
          500: "#eece19"
        },
        'ncs-blue': {
          800: '#0f1e3a'
        }
      },
      maxWidth: {
        'ncs-content': "998px"
      },
      screens: {
        xs: "375px",
        mob: "450px",
        sm: "640px",
        md: "768px",
        tab: "860px",
        lg: "1024px",
        'ncs-min': "1125px",
        xl: "1280px",
        '2xl': "1536px",
        hd: "1920px",
      },
      typography: ({ theme }) => ({
        'ncs-dark': {
          css: {
            '--tw-prose-body': theme('colors.ncs-dark[100]'),
            '--tw-prose-headings': theme('colors.ncs-dark[100]'),
            '--tw-prose-lead': theme('colors.ncs-dark[300]'),
            '--tw-prose-links': theme('colors.ncs-dark[300]'),
            '--tw-prose-bold': theme('colors.ncs-dark[100]'),
            '--tw-prose-counters': theme('colors.ncs-dark[500]'),
            '--tw-prose-bullets': theme('colors.ncs-dark[500]'),
            '--tw-prose-hr': theme('colors.ncs-dark[300]'),
            '--tw-prose-quotes': theme('colors.ncs-dark[100]'),
            '--tw-prose-quote-borders': theme('colors.ncs-dark[300]'),
            '--tw-prose-captions': theme('colors.ncs-dark[300]'),
            '--tw-prose-code': theme('colors.ncs-dark[300]'),
            '--tw-prose-pre-code': theme('colors.ncs-dark[300]'),
            '--tw-prose-pre-bg': theme('colors.ncs-dark[800]'),
            '--tw-prose-th-borders': theme('colors.ncs-dark[500]'),
            '--tw-prose-td-borders': theme('colors.ncs-dark[300]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
