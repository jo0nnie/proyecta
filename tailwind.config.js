// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Colores base (modo claro y oscuro comparten algunos)
        'primary': {
          '300' :'#A9B5EF',
          '400': '#4267DD',
          '500': '#2C4692',
        },


        // Modo claro
        'light': {
          'background': '#A9B5EF',
          'acceptButton': '#4267DD',
          'cancelButton': '#2C4692',
          'logo': '#000000',
          'text': '#000000',
        },

        // Modo oscuro
        'dark': {
          'background': '#4267DD',
          'acceptButton': '#A9B5EF',
          'cancelButton': '#1A267D',
          'logo': '#DADEF9',
          'text': '#FFFFFF',
        },
      },
      'fontFamily': {
        'inter': ['Inter', 'sans-serif'],
      },

      'spacing': {
        '0': '0px',
        'espaciado-sm': '8px',
        'espaciado-md': '16px',
        'espaciado-lg': '32px',
      },

      'fontSize': {
        'sm': '12px',
        'base': '16px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
}

