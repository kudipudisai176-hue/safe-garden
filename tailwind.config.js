/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E2F1FF",
          100: "#D3E9FC",
          200: "#B9DCF8",
          300: "#9ECAF2",
          400: "#78B4EC",
          500: "#549FE6",
          600: "#438CCF",
          700: "#3579B5",
          800: "#2F6796",
          900: "#28557A",
          950: "#183E5C",
        },
        forest: { DEFAULT: "#549FE6", dark: "#234B70", soft: "#3F85C5" },
        leaf: { DEFAULT: "#549FE6", light: "#E2F1FF" },
        cream: { DEFAULT: "#E2F1FF", deep: "#D3E9FC" },
        gold: { DEFAULT: "#549FE6", dark: "#3579B5" },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(35,75,112,.18)",
      },
    },
  },
  plugins: [],
};
