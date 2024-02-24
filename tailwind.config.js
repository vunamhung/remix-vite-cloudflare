const { fontFamily, spacing } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    // './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',
    './node_modules/@nextui-org/theme/dist/**/*.js',
  ],
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
      },
      container: {
        center: true,
        padding: spacing[6],
        screens: {
          sm: '100%',
          md: '640px',
          lg: '960px',
          xl: '1600px',
        },
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
    nextui(),
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
  ],
};
