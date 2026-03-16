/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Poppins', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
      colors: {
        bg: '#2A2725',
        surface: '#343130',
        border: '#3d3936',
        primary: '#F0ECE6',
        muted: '#8a7f7a',
        accent: '#D96239',
        yellow: '#c8a96e',
        blue: '#7daea3',
        purple: '#b49fca',
        aqua: '#89b482',
        cyan: '#7daea3',
      },
    },
  },
  plugins: [],
}
