import type { Config } from "tailwindcss"
import tailwindAnimated from "tailwindcss-animate"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gridTemplateColumns: {
          '5': 'repeat(5, minmax(0, 1fr))',
          '6': 'repeat(6, minmax(0, 1fr))',
        },
      },
      colors: {
        primary: "#2E8B57",
        accent: "#C44536",
        background: "#F9FAFB",
        foreground: "#1A1A1A",
        muted: "#E5E7EB",
        success: "#4CAF50",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ['var(--font-body)', "sans-serif"],
        heading: ['var(--font-heading)', "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [tailwindAnimated],
}

export default config;