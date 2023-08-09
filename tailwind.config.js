module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      spacing: {
        "1/2-screen": "50vh",
        "28rem": "28rem",
        "32rem": "32rem",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
  
};
