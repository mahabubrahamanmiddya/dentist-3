import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#ece0d1',      // Primary Background
          chocolate: '#dbc1ac', // Secondary Background
          brown: '#dbc1ac',     // Secondary Background
          glass: 'rgba(220, 193, 172, 0.45)',
        },
        accent: {
          orange: '#967259',    // Primary Accent
          copper: '#967259',    // Primary Accent
          bronze: '#634832',    // Dark Brown
          gold: '#634832',      // Dark Brown
          cream: '#38220f',     // Text / CTA
          creamMuted: '#634832',// Muted Dark Brown
          glow: 'rgba(150, 114, 89, 0.08)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        buttons: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'orange-glow': '0 20px 40px rgba(99, 72, 50, 0.08)',
        'orange-glow-sm': '0 10px 20px rgba(99, 72, 50, 0.04)',
        'glass-border': 'inset 0 1px 1px rgba(255, 255, 255, 0.2)',
      }
    },
  },
  plugins: [],
};

export default config;
