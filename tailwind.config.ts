import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      gray: "#333333",
      "gray-light": "#00000040",
      white: "#FFFFFF",
      "blue-light": "#00B4D8",
      "blue-dark": "#013552",
      orange: "#F45103",
      black: "#000000",
      "gray-mid": "#000D1480"
    },
    fontFamily: {
      logo: ["Quicksand", "sans-serif"],
      title: ["Raleway", "sans-serif"],
      body: ["Roboto", "sans-serif"],
      button: ["Roboto", "sans-serif"]
    },
    extend: {}
  },
  plugins: [],
  important: false
} satisfies Config;
