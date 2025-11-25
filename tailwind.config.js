/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "book-dark": "#2B2B2B",
      },
      colors: {
        "book-dark": "#f8f8ea",
      },
    },
  },
  plugins: [heroui()],
};
