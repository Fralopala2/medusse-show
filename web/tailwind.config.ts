import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores originales de Soleares (mantener compatibilidad)
        soleares: {
          black: "#1a1a1a",
          white: "#ffffff",
          blue: "#3b82f6",
          green: "#22c55e",
          gray: "#171717",
          "gray-light": "#f5f5f5",
          "gray-dark": "#333333",
        },
        // Colores corporativos de Medusse IoT
        medusse: {
          blue: "#2196F3",
          darkblue: "#1976D2",
          red: "#E53E3E",
          purple: "#805AD5",
          orange: "#FF9800",
          green: "#38A169",
          black: "#0a0e17",
          white: "#f0f4f8",
          gray: "#94a3b8",
          "gray-light": "#111827",
        },
        cinematic: {
          bg: "#0a0e17",
          surface: "#121a2b",
          accent: "#00d4aa",
          glow: "#2196f3",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
