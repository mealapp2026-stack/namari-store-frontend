/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08152f",
        navy: "#0d2149",
        cyan: "#19c5db",
        mist: "#f3f6fa",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 50px -28px rgba(8, 21, 47, 0.28)",
        glow: "0 12px 40px -12px rgba(25, 197, 219, 0.45)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
