/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
const config = {
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
      },
      backgroundImage: {
        "repeating-gradient":
          "repeating-linear-gradient(to right, #444cf7, #444cf7 1px, #e5e5f7 1px, #e5e5f7)",
      },
      backgroundSize: {
        "20px": "20px 20px",
      },
    },
  },
  plugins: [
    scrollbar({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};

export default config;
