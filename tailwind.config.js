/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mono: {
          950: '#070A11',
          900: '#0D121C',
          850: '#131A28',
          800: '#1A2336',
          700: '#26334D',
          600: '#475569',
        },
        threat: {
          safe: '#10B981',
          detected: '#F59E0B',
          analyzing: '#6366F1',
          potential: '#F97316',
          logged: '#EF4444',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
