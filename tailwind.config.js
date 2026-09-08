/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1a1a",
        paper: "#faf8f4",
        accent: "#b3261e",
        muted: "#6b6560",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body: ["-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
