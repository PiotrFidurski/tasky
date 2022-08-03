const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-rgba': 'rgba(0, 0, 0, 0.10)',
        'light-rgba': 'rgba(0, 0, 0, 0.06)',

        light: '#F3F3F4',
        greyLight: '#e7e7e7',
        dark: '#050507',
        highlight: '#00B7FC',
        highlightActive: '#039be5',
        strokeHighlight: '#00b7fc54',
        shadowHighlight: '#26327636',
        // LightMode
        primary: '#F4F6FD',
        secondary: '#0A1638',
        // #0a1244 0A155A
        borderAndIcons: '#ADBAEB',
        blacker: '#020417',
        textGray: '#9D9AB4',
        textGrayDarker: '#7D7A8D',
        darkgray: '#373B5E',
        buttonColor: '#2643C4',
        grayLight: '#607d8b26',
        shadowPrimary: '#f4f6fd85',
        shadowSecondary: '#2643c4a6',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
