import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",            // ← enables .dark class strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // v2 blue palette -- every indigo/blue/purple/violet utility resolves to it
        indigo: {
          50:  "#f3f7ff",
          100: "#e6eeff",
          200: "#c3d4ff",
          300: "#9ab4ff",
          400: "#6b93ff",
          500: "#3b6dff",
          600: "#1f56f0",
          700: "#1640c4",
          800: "#0c2766",
          900: "#0a1a3f",
          950: "#0b1222",
        },
        blue: {
          50:  "#f3f7ff",
          100: "#e6eeff",
          200: "#c3d4ff",
          300: "#9ab4ff",
          400: "#6b93ff",
          500: "#3b6dff",
          600: "#1f56f0",
          700: "#1640c4",
          800: "#0c2766",
          900: "#0a1a3f",
          950: "#0b1222",
        },
        purple: {
          50:  "#f3f7ff",
          100: "#e6eeff",
          200: "#c3d4ff",
          300: "#9ab4ff",
          400: "#6b93ff",
          500: "#3b6dff",
          600: "#1f56f0",
          700: "#1640c4",
          800: "#0c2766",
          900: "#0a1a3f",
          950: "#0b1222",
        },
        violet: {
          50:  "#f3f7ff",
          100: "#e6eeff",
          200: "#c3d4ff",
          300: "#9ab4ff",
          400: "#6b93ff",
          500: "#3b6dff",
          600: "#1f56f0",
          700: "#1640c4",
          800: "#0c2766",
          900: "#0a1a3f",
          950: "#0b1222",
        },
        slate: {
          900: "#111827",
          600: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        // UI label role (nav, tags, dates, metadata): Inter with tabular figures so numbers line up.
        label: [["Inter", "system-ui", "sans-serif"], { fontFeatureSettings: '"tnum"' }],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
