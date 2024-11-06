/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
    "./index.html"
  ],

  theme: {

    screens: {
      'xs': '376px',
      'sm': '480px',
      'md': '768px',
      'lg': '1136px',
      'xl': '1440px',
      '2xl': '2500px'
    },
    extend: {
      colors: {
        'primary': '#6f48df',
        'primary-hover': '#4f46e5',
        'secondary': '#43444a',
        'secondary-hover': '#2f3138',
        'success': '#20AF7B',
        'danger': '#ff6767',
        'placeholder-line': '#FFF',
        'warning': '#ffc82c',
        'background': '#181A1E',
        'component': '#24252B',
        'component-hover': '#2f3138',
        'input': '#43444a',
        'input-line': '#4C4E58',
        'link': '#248FDC'
      },
    },

  },
  plugins: [],
}

