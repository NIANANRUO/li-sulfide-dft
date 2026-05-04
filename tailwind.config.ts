import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071019",
        panel: "#0d1726",
        line: "rgba(148, 163, 184, 0.22)",
        cyan: "#38d7ff",
        violet: "#a78bfa"
      },
      boxShadow: {
        glow: "0 0 42px rgba(56, 215, 255, 0.16)"
      },
      backgroundImage: {
        "science-grid":
          "linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
