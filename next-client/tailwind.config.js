/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      pop: {
        "0%, 100%": { transform: "scale(1)", opacity: "1" },
        "50%": { transform: "scale(1.1)", opacity: "0.9" },
      },
    },
    animation: {
      "spin-slow": "spin 3s linear infinite",
      pop: "pop 0.5s ease-in-out",
      "pop-infinite": "pop 3s ease-in-out infinite",
      "pop-short": "pulse 300ms ease-in",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
