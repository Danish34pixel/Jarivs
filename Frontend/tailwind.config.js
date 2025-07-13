/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "coffee-brown": "radial-gradient(circle, #5a2e17, #3a1c0e, #1e0d06)",
      },
    },
  },
  plugins: [],
};
