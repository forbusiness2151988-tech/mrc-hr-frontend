/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Deep ink-blue as the brand base — evokes ledgers/registers (fits CRM+HR+Accounting),
        // with a warm amber accent for actions/highlights so it doesn't read as a generic SaaS blue.
        ink: {
          50: "#f1f4f8",
          100: "#dbe3ee",
          200: "#b7c7dd",
          300: "#8ba3c4",
          400: "#5c7aa3",
          500: "#3f5c83",
          600: "#2f4868",
          700: "#243854",
          800: "#1a2940",
          900: "#111c2e",
          950: "#0a121e",
        },
        amber: {
          400: "#e8a94a",
          500: "#d99730",
          600: "#b87b22",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
