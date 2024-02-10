/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        backgroundColor: {
          light: "#FFDEDE",
          dark: "#000000",
        },
        textColor: {
          light: "#000000",
          dark: "#FFFFFF",
        },
        hoverColor: {
          light: "#DEE4E7",
          dark: "#37474F",
        },
        sideBarBackgroundColor: {
          light: "#FFFFFF",
          dark: "#0f172a",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtlities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) white",
        },

        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white",
          },
        },
      };
      addUtilities(newUtlities, ["responsive", "hover"]);
    },
  ],
};
