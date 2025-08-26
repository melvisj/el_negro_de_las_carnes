/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ['"Anton"', "sans-serif"],
      },
      colors: {
        brandRed: "#A21825",
        brandDark: "#0C1922", // tu fondo oscuro
      },
    },
  },
  plugins: [],
};
