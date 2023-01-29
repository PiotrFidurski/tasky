const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '24rem-auto1fr': '24rem minmax(auto, 32rem)',
        'col-32': 'repeat(1, minmax(auto, 32rem))',
      },
      boxShadow: {
        'custom-light': '0px 0px 15px 2px rgb(0 0 0 / 10%)',
        'custom-dark': '0px 0px 15px 2px rgb(255 255 255 / 15%)',
      },
      colors: {
        primary: '#F4F6FD',
        secondary: '#0A1638',
        highlight: '#3358ff',
        textGray: '#9D9AB4',
        grayLight: '#607d8b26',
        shadowPrimary: '#f4f6fd85',
        shadowSecondary: '#5b79ffa6',
        'custom-indigo': '#ADBAEB',
        'custom-blue': '#2643C4',
        'dark-rgba': 'rgba(0, 0, 0, 0.10)',
        'light-rgba': 'rgba(0, 0, 0, 0.01)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
