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
        obsidian: {
          950: '#030712',
          900: '#0B0F19',
          850: '#111726',
          800: '#172033',
          700: '#1E293B',
          600: '#334155',
        },
        brand: {
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          violet: '#6366F1',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        threat: {
          safe: '#10B981',
          detected: '#F59E0B',
          analyzing: '#8B5CF6',
          potential: '#F97316',
          logged: '#F43F5E',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'border-beam': 'borderBeam 6s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'wave-flow': 'waveFlow 4s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        borderBeam: {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        pulseGlow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 4px currentColor)' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 16px currentColor)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
