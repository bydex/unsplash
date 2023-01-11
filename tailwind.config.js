/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      dark: "#000000",
      light: "#ffffff",
      overlay: "rgba(40, 36, 22, 0.5)",
      "gray-3": "#828282",
      accent: "#219653",
    },
  },
  plugins: [require("flowbite/plugin")],
};
