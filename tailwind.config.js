/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,ts,html,js,jsx}'],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'lg': '1024px',
        'xl': '1280'
      },
      height: {
        '100': '100%',
      },
      fontFamily: {
        menu: ['Lato', 'Open Sans', 'Sans-Serif'],
        list_products: ['Roboto Serif', 'Open Sans', 'Sans-Serif'],
        mont: ['Montserrat', 'Open Sans']
      },
      boxShadow: {
        menu: ['0 1px 5px black']
      },
      colors: {
        'main': "#A2845E",
        'remove': "#FF5050",
        'edit': "#8FC3FF",
        'expand': "#E1DAC0",
        'main-green': "#256D23",
        'gray': "#9A9A9A",
        'light_gray': "#D0D0D0",
        'blood_red': "#660000",
        'dark_green': "#013220",
        'red': "#FF0000"
      }
    },
  },
  plugins: [],
}

