import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#070B1F", 900: "#0B1230", 800: "#0E1638", 700: "#172152", 600: "#22306b" },
        blast: { DEFAULT: "#2F8CFF", 400: "#5AA4FF", 600: "#1A6FE0" },
        ice: "#E8F4FF",
        soft: "#AFC6FF",
        wa: { DEFAULT: "#25D366", 600: "#1DA851" },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(47 140 255 / 0.25), 0 10px 40px -10px rgb(47 140 255 / 0.45)",
        card: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 20px 50px -20px rgb(0 0 0 / 0.6)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        spark: { "0%, 100%": { opacity: "0.35" }, "50%": { opacity: "1" } },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        spark: "spark 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
