/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        rich: {
          bg: "#101d25", 
          neon: "#00ffae", 
          gold: "#ffd54f", 
          hoverGold: "#ffca28", 
          input: "#0d141a", 
          text: "#ffffff", 
          soft: "#aaaaaa", 
          shadow: "rgba(0, 255, 174, 0.3)", 
        },
      },
    },
  },
  plugins: [],
};
