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
        serif: ['Lato', ...defaultTheme.fontFamily.serif],
        icon: ['icon', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'ncs-tweed': "url('/tweed.png')",
        'ncs-flourish': "url('/flourish.png')",
        'ncs-flourish-side': "url('/flourish-side.png')",
        'ncs-grid': "linear-gradient(#0004, #0000), url('/grid-dark.png')",
      },
      colors: {
        'ncs-brown': '#926602',
        'ncs-yellow': '#f5f8cc',
        'ncs-blue': '#55b2ff',
        'ncs-orange': '#f69901',
        'ncs-red': {
          100: "#f04659",
          500: "#c92443",
        },
        'ncs-light-gray': {
          200: "#aaaaaa",
        },
        'ncs-gray': {
          200: "#3f4244",
          300: "#383b3d",
          400: "#313436",
          500: "#262a2e",
          600: "#232428",
          700: "#1f2025",
          900: "#131315",

        },
        'ncs-dark': {
          100: "#f2f2f2",
          200: "#9ca3af",
          300: "#494c4e",
          400: "#3d4042",
          500: "#313436",
          600: "#232428",
          700: "#1a1a1c",
          800: "#131315",
        },
        'ncs-header': {
          'base': "#da6d11",
          'hover': "#be4f2f",
          'selected': "#ac2d3a",
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
            h1: {
              color: theme('colors.ncs-orange')
            },
            'input, textarea': {
              color: '--tw-prose-body',
              'background-color': theme('colors.ncs-dark[700]'),
              'border-color': theme('colors.ncs-dark[200]')
            },
            '--tw-prose-body': theme('colors.ncs-dark[100]'),
            '--tw-prose-headings': theme('colors.ncs-blue'),
            '--tw-prose-lead': theme('colors.ncs-dark[300]'),
            '--tw-prose-links': theme('colors.ncs-dark[100]'),
            '--tw-prose-bold': theme('colors.ncs-dark[100]'),
            '--tw-prose-counters': theme('colors.ncs-dark[300]'),
            '--tw-prose-bullets': theme('colors.ncs-dark[300]'),
            '--tw-prose-hr': theme('colors.ncs-dark[300]'),
            '--tw-prose-quotes': theme('colors.ncs-dark[200]'),
            '--tw-prose-quote-borders': theme('colors.ncs-dark[300]'),
            '--tw-prose-captions': theme('colors.ncs-dark[200]'),
            '--tw-prose-code': theme('colors.ncs-dark[200]'),
            '--tw-prose-pre-code': theme('colors.ncs-dark[200]'),
            '--tw-prose-pre-bg': theme('colors.ncs-dark[800]'),
            '--tw-prose-th-borders': theme('colors.ncs-dark[300]'),
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
