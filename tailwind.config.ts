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

      fontSize: {
        xxs: ["0.625rem", "1rem"],
      },

      maxWidth: {
        "8xl": "90rem",
      },

      screens: {
        xs: "460px",
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },

      colors: {
        primary: {
          25: "var(--primary-25)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },

        gray: {
          25: "var(--gray-25)",
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
          950: "var(--gray-950)",
        },

        b: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          tertiary: "var(--border-tertiary)",
        },

        bg: {
          primary: "var(--bg-primary)",
          "primary-hover": "var(--bg-primary-hover)",
          secondary: "var(--bg-secondary)",
          "secondary-hover": "var(--bg-secondary-hover)",
          tertiary: "var(--bg-tertiary)",
          quaternary: "var(--bg-quaternary)",

          active: "var(--bg-active)",
          disabled: "var(--bg-disabled)",
          overlay: "var(--bg-overlay)",
        },

        t: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          "secondary-hover": "var(--text-secondary-hover)",
          tertiary: "var(--text-tertiary)",
          "tertiary-hover": "var(--text-tertiary-hover)",
          quaternary: "var(--text-quaternary)",

          disabled: "var(--text-disabled)",
          placeholder: "var(--text-placeholder)",
        },

        theme: {
          moss: "#4f7a21",
          green: "#099250",
          teal: "#0e9384",
          cyan: "#088ab2",
          blue: "#1570ef",
          indigo: "#444ce7",
          violet: "#7839ee",
          purple: "#6938ef",
          fuchsia: "#ba24d5",
          pink: "#dd2590",
          rose: "#e31b54",
          orange: "#e62e05",
          yellow: "#ca8504",
        },
      },

      borderColor: {
        DEFAULT: "var(--border-secondary)",
      },
    },
  },
  plugins: [],
};

export default config;
