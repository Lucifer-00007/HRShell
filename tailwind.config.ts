import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e6ecff",
          200: "#cbd8ff",
          300: "#a4b9ff",
          400: "#7b94ff",
          500: "#5a6fff",
          600: "#4b52f5",
          700: "#3f41cb",
          800: "#3438a1",
          900: "#2c2f7d"
        }
      },
      fontFamily: {
        sans: ["var(--font-space)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
