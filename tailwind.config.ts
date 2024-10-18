import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        manrope: "var(--font-manrope)",
        lexend: "var(--font-lexend)",
        inter: "var(--font-inter)",
      },
    },
  },
  plugins: [],
};

export default config;
