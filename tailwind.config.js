/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#141314",
        "dark-800": "#403E3E",
        "white-900": "#FFFFFF",
        primary: "#5E1C20",
        "primary-100": "#F8ECED",
        secondary: "#fec763",
        "secondary-500": "#99633a",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        libre: ["Libre Bodoni", "serif"],
      },
      backgroundImage: {
        page: "url('/images/page_bg.jpg')",
      },
      boxShadow: {
        "custom-shadow": "-8px -8px 30px rgba(0,0,0,0.4) inset",
        "page-inner-shadow": "3px 0px 20px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
