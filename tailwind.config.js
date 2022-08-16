const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-rgba': 'rgba(0, 0, 0, 0.10)',
        'light-rgba': 'rgba(0, 0, 0, 0.01)',

        light: '#F3F3F4',
        greyLight: '#e7e7e7',
        dark: '#050507',
        highlight: '#3358ff',
        highlightActive: '#039be5',
        strokeHighlight: '#00b7fc54',
        shadowHighlight: '#26327636',
        // LightMode
        primary: '#F4F6FD',
        secondary: '#0A1638',
        // #0a1244 0A155A
        'custom-indigo': '#ADBAEB',
        blacker: '#020417',
        textGray: '#9D9AB4',
        textGrayDarker: '#646464',
        darkgray: '#373B5E',
        'custom-blue': '#2643C4',
        grayLight: '#607d8b26',
        shadowPrimary: '#f4f6fd85',
        shadowSecondary: '#5b79ffa6',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
