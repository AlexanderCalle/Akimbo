/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "akimbo-dark-900": "#1E1E1E",
      "akimbo-dark-500": "#4A4A4A",
      "akimbo-light": "#F2F2F2",
      "tag-red": "#C02A2A",
      "tag-orange": "#C3700F",
      "tag-yellow": "#DAC827",
      "tag-blue": "#5468D2",
      "tag-green": "#16AC1C",
      "tag-purple": "#B81EBB",
    },
    fontFamily: {
      sans: ["Oswald", ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
