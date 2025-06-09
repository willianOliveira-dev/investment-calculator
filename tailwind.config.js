/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        rich: {
          bg: "#006DAA",
          highlight: "#9DCEFF",
          gold: "#ffca29",
          hoverGold: "#ffca28",
          input: "#003559",
          text: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
