import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#E8590C",
        deep: "#B84208",
        turmeric: "#F5A623",
        night: "#0C0A06",
        charcoal: "#1E1A14",
        warmDark: "#2A1F0E",
        cream: "#FBF7F0",
        parchment: "#F7F1E8",
        warmWhite: "#FEFCF8",
        ash: "#9E8E7A",
        border: "#E5D9C8",
        farmer: "#2E7D32",
        house: "#AD1457",
        civic: "#1565C0",
        traffic: "#E65100",
        spirit: "#7B1C1C",
        teal: "#00766C",
      },
      fontFamily: {
        te: ["Noto Serif Telugu", "serif"],
        teBody: ["Tiro Telugu", "serif"],
        serif: ["Cormorant Garamond", "serif"],
        mono: ["DM Mono", "monospace"],
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
