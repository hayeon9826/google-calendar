module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {},

    minWidth: {
      20: "20px",
    },
    gridTemplateRows: {
      24: "repeat(24, minmax(0, 1fr))",
    },
  },
  plugins: [],
};
