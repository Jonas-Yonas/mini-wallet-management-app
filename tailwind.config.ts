/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";

export const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e8f9f0",
          100: "#c1e9d8",
          200: "#98d8bb",
          300: "#6fc79f",
          400: "#49b788",
          500: "#2b9d6e",
          600: "#22835b",
          700: "#186645",
          800: "#10432f",
          900: "#072117",
        },
      },
    },
  },
};
