/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      width: {
        400: "400px"
      },
      height: {
        380: "380px"
      }
    }
  }
}
