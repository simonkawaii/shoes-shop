/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderColor: (theme) => ({
      ...theme("colors"),
      default: theme("colors.grey", "currentColor"),
      grey: "#505050",
      primary: "#9333ea",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),

    colors: {
      primary: {
        DEFAULT: "#9333ea",
        hover: "#a855f7",
      },
      green: {
        DEFAULT: "#55F7A8",
        hover: "#55F7A8",
      },
      black: "#141414",
      yellow: "#F7A855",
      white: "#fff",
      red: "#e53f71",
      grey: "#505050",
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [],
};
