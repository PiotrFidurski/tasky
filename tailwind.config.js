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
        strokeHighlight: '#00b7fc54',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
