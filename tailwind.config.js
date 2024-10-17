/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('./assets/GradientWit.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "akimbo-dark-900": "#1E1E1E",
      "akimbo-dark-500": "#4A4A4A",
      "akimbo-dark-200": "#4A4A4A60",
      "akimbo-light": "#F2F2F2",
      "tag-red": "#C02A2A",
      "tag-orange": "#C3700F",
      "tag-yellow": "#DAC827",
      "tag-blue": "#5468D2",
      "tag-green": "#16AC1C",
      "tag-purple": "#B81EBB",
    },
    fontFamily: {
      sans: ["Helvetica Rounded", ...defaultTheme.fontFamily.sans],
      serif: ["Paragon", ...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
