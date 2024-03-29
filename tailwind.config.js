/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["BPG Nino Mtavruli", "sans-serif"],
      },
      colors: {
        custom: {
          light: "#dce1ed",
          dark: "#a4aec4",
          yellow: "#f3c237",
          green: "#79b851",
          text: "#414a5e",
          border: "#dee1e9",
          borderDark: "#a7adc0",
          hover: "#c4cbdd",
          paragraph: "#2e3239",
          div: "#e8ecfc",
          lightGrey: "#edf0f5",
          lightGreen: "#e6f3e6",
          veryLightGrey: "#f5f7fb",
        },
      },
    },
  },
  plugins: [],
};
