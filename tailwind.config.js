/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#fbfcff",
        customBorder: "#dee1e9",
        customBorder2: "#a7adc0",
        letterColor: "#393e4c",
      },
      fontSize: {
        35: "35px",
      },
    },
  },
  plugins: [],
};
