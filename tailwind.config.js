const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#F3F3F4',
        greyLight: '#e7e7e7',
        dark: '#050507',
        highlight: '#00B7FC',
        highlightActive: '#039be5',
        strokeHighlight: '#00b7fc54',
        shadowHighlight: '#26327636',
        // LightMode
        primary: '#F4F6FD',
        secondary: '#0a1638',
        // #0a1244 0A155A
        borderAndIcons: '#ADBAEB',
        blacker: '#020417',
        textGray: '#9d9ab4',
        darkgray: '#373b5e',
        buttonColor: '#2643c4',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
