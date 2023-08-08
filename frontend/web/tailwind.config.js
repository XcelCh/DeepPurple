/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        128: "26rem",
      },
      borderRadius: {
        '4xl': '3rem', // Adjust the value as needed
      },
    },
  },
  plugins: [require("daisyui", "flowbite/plugin")],
};

