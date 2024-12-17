const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|date-picker|ripple|spinner|calendar|date-input|form|popover).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
