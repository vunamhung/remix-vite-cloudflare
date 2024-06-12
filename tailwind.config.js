const { fontFamily, spacing } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Inter Fallback', ...fontFamily.sans],
      body: fontFamily.sans,
    },
    gridAutoFit: {
      1: spacing[1],
      7: spacing[7],
    },
    gridAutoFill: {
      1: spacing[1],
      7: spacing[7],
    },
    extend: {
      colors: {
        neutral: colors.slate,
        positive: colors.green,
        urge: colors.violet,
        warning: colors.yellow,
        info: colors.blue,
        critical: colors.red,
        primary: {
          50: '#f0faf6',
          100: '#e4f7ef',
          200: '#bce8d3',
          300: '#9adbb8',
          400: '#5bc27f',
          500: '#28a745',
          600: '#21963b',
          700: '#167d2b',
          800: '#0e631e',
          900: '#084a13',
          950: '#03300a',
        },
        secondary: {
          50: '#fefff2',
          100: '#fdffe6',
          200: '#fbffc2',
          300: '#f7ff9c',
          400: '#edff4f',
          500: '#e3ff04',
          600: '#c0e605',
          700: '#93bf02',
          800: '#6c9902',
          900: '#497301',
          950: '#2a4a01',
        },
      },
      container: {
        center: true,
        padding: spacing[6],
      },
      screens: {
        dlg: { max: '1023px' },
        dmd: { max: '767px' },
      },
      maxWidth: {
        'min-content': 'min-content',
        'max-content': 'max-content',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      maxHeight: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      minWidth: {
        'min-content': 'min-content',
        'max-content': 'max-content',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
      },
      minHeight: {
        'min-content': 'min-content',
        'max-content': 'max-content',
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        '4/5': '80vh',
      },
      inset: {
        '1/2': '50%',
        '-1/2': '-50%',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme, addVariant }) => {
      addVariant('child', '&>*');
      matchUtilities(
        { 'grid-auto-fit': (value) => ({ gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))` }) },
        { values: theme('gridAutoFit') },
      );
      matchUtilities(
        { 'grid-auto-fill': (value) => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))` }) },
        { values: theme('gridAutoFill') },
      );
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms', { strategy: 'class' }),
    require('@tailwindcss/container-queries'),
  ],
};
