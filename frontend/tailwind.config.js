/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4E72DA",
          secondary: "#AADA4E",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#F4F5F7",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("prettier-plugin-tailwindcss")],
};
