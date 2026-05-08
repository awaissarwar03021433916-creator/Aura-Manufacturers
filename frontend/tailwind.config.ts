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
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: "#FAF7F2",
        beige: "#F2EDE5",
        ink: "#1A1410",
        muted: "#6B5D52",
        camel: "#8B6F47",
        cognac: "#5C4A33",
        gold: "#C9A961",
        line: "#E8E1D6",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Fraunces", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Manrope", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.18em",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        400: "400ms",
        450: "450ms",
      },
    },
  },
  plugins: [],
};
export default config;
