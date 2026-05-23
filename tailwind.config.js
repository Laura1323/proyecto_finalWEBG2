/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf5",
          100: "#d6f8e7",
          500: "#12a150",
          600: "#0b8640",
          700: "#086c35",
          900: "#064526",
        },
        ink: "#172033",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 32, 51, 0.08)",
      },
    },
  },
  plugins: [],
};
