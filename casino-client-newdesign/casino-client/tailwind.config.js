// eslint-disable-next-line @typescript-eslint/no-require-imports
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      defaultTheme: "casino-dark",
      themes: {
        "casino-dark": {
          extend: "dark",
          colors: {
            background: "#1B1C2D",
            foreground: "#FFFFFF",
            content1: "#131420",
            content2: "#1F2037",
            content3: "#2A2B44",
            content4: "#35374F",
            divider: "#27272F",
            overlay: "rgba(0, 0, 0, 0.5)",
            focus: "#794DFD",
            primary: {
              50: "#EDE9FE",
              100: "#DDD6FE", 
              200: "#C4B5FD",
              300: "#A78BFA",
              400: "#8B5CF6",
              500: "#794DFD",
              600: "#7C3AED",
              700: "#6D28D9",
              800: "#5B21B6",
              900: "#4C1D95",
              DEFAULT: "#794DFD",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#B09DFF",
              foreground: "#000000",
            },
            success: {
              DEFAULT: "#10B981",
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#F59E0B",
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#EF4444",
              foreground: "#FFFFFF",
            },
          },
          layout: {
            radius: {
              small: "8px",
              medium: "12px", 
              large: "20px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
            disabledOpacity: "0.5",
            boxShadow: {
              small: "0px 4px 10px 0px rgba(0, 0, 0, 0.15)",
              medium: "0px 6px 20px 0px rgba(0, 0, 0, 0.2)",
              large: "0px 10px 30px 0px rgba(0, 0, 0, 0.25)",
            },
          },
        },
      },
    }),
  ],
}; 