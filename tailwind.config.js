const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#F3F3F4',
        dark: '#050507',
        highlight: '#00B7FC',
        highlightActive: '#039be5',
        strokeHighlight: '#00b7fc54',
        shadowHighlight: '#26327636',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
