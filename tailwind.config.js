module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // new dark mode
        highlight: '#00E5B0',
        highlightDarker: '#113c32',
        highlightLighter: '#d4ede7',
        dark: '#050507',
        active_dark: '#212121',
        lightGray: '#F2FAFF',
        // new light mode
        light: '#F3F3F4',
        darkGray: '#0E1F2B',
        active: '#e7e7e7',

        // old
        custom__bluedark: '#020304',
        custom__gray: '#0E1F2B',
        custom__hoverdark: 'rgba(255 255 255 / 10%)',
        custom__hoverlight: 'rgba(0 0 0 / 10%)',
        custom__ghostly: '#F2FAFF',
      },
    },
  },
  plugins: [],
};
