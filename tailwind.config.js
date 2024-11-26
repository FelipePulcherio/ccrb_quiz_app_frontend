
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],  // Content paths
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#121212', // Faded black
          yellow: '#FFD700', // Yellow
          green: '#32CD32',  // Lime green (correct answer)
          red: '#FF4C4C',    // Bright red (incorrect)
        },
      },
      spacing: {
        '42': '170px',  // Custom spacing for 170px
      },
    },
  },
  plugins: [],
};