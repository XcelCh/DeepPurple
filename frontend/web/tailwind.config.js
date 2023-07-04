/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js","./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui", "flowbite/plugin")],
};

