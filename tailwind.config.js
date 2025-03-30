import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    ".flowbite-react\\class-list.json",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          10: "#f4f4f4",
          20: "#cfcfcf",
          1000: "#292929",
        },
      },
    },
  },
  plugins: [flowbiteReact],
};
