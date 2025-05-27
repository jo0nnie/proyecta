// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primario: '#4CAF50',
        secundario: '#FF9800',
        fondo: '#A9B5EF',
        texto: '#212121',
      },
      fontFamily: {
        principal: ['Roboto', 'sans-serif'],
      },
      spacing: {
        'espaciado-sm': '8px',//small 
        'espaciado-md': '16px',//medium
        'espaciado-lg': '32px',//large
      },
      fontSize: {
        sm: '12px',
        base: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
}
