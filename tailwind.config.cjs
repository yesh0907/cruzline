/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#F5CA44",
        darkBlue: "#163C69",
        grey: "#727272",
        lightBlue: "#1086DD",
      },
      fontFamily: {
         OpenSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
