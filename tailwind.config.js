/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brainlabs: {
          pink: "#ff5c8d",
          blue: "#80dbff",
          dark: "#1b1b1b",
          black: "#000000",
          cream: "#fffceb",
          grey: "#f5f5f5",
          yellow: "#fff95f",
          green: "#00FF6A",
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      boxShadow: {
        'boxy-sm': '2px 2px 0px 0px #1b1b1b',
        'boxy': '4px 4px 0px 0px #1b1b1b',
        'boxy-lg': '8px 8px 0px 0px #1b1b1b',
        'boxy-pink': '4px 4px 0px 0px #ff5c8d',
        'boxy-blue': '4px 4px 0px 0px #80dbff',
        'boxy-double': '4px 4px 0px 0px #1b1b1b, 8px 8px 0px 0px #ff5c8d',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
