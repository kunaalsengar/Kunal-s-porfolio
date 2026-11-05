/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050508",
        obsidian: "#0a0b10",
        surface: {
          DEFAULT: "#111218",
          light: "#1a1c24",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.12)"
        },
        titanium: "#8b939c",
        chrome: "#e2e8f0",
        accent: {
          cyan: "#00f0ff",
          amber: "#ff9f1c",
          purple: "#8b5cf6"
        }
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.12) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}

