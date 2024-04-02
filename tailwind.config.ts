import type { Config } from "tailwindcss";
const {fontFamily} = require("tailwindcss/defaultTheme") 

const config: Config = {
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#038C7F',
        // -----primary: 'background:linear-gradient(90deg, rgba(2, 8, 149, 1) 0%, rgba(0, 188, 212, 1) 79%, rgba(130, 156, 238, 1) 100%)',
        primary:'#020895', 

        secondary: '#F2C641', 
        tertiary: {
          dark: '#F27405', 
          // light: '#F2C641', 
          light:'#2196F3', 
        }, 
      },
      fontFamily: {
        poppins: ['var(--font-poppins)',...fontFamily.sans]
      }
    },
  },
  plugins: [],
};
export default config;
