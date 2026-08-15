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
        soc: {
          bg: '#07090E',
          surface: '#0E131F',
          card: '#141B2D',
          border: '#1E293B',
          muted: '#64748B',
          highlight: '#38BDF8',
        },
        state: {
          safe: {
            DEFAULT: '#10B981',
            glow: 'rgba(16, 185, 129, 0.25)',
            text: '#34D399',
            border: '#059669',
          },
          detected: {
            DEFAULT: '#F59E0B',
            glow: 'rgba(245, 158, 11, 0.25)',
            text: '#FBBF24',
            border: '#D97706',
          },
          analyzing: {
            DEFAULT: '#6366F1',
            glow: 'rgba(99, 102, 241, 0.25)',
            text: '#818CF8',
            border: '#4F46E5',
          },
          potential: {
            DEFAULT: '#F97316',
            glow: 'rgba(249, 115, 22, 0.25)',
            text: '#FB923C',
            border: '#EA580C',
          },
          logged: {
            DEFAULT: '#EF4444',
            glow: 'rgba(239, 68, 68, 0.35)',
            text: '#F87171',
            border: '#DC2626',
          },
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'sweep 4s linear infinite',
        'signal-glow': 'signalGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        signalGlow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 4px currentColor)' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 12px currentColor)' },
        },
      },
    },
  },
  plugins: [],
};
