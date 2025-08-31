/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      fontFamily: { sans: ['ui-sans-serif', 'system-ui'] }
    },
  },
  plugins: [],
};
