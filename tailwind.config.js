/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zenicorp: {
          // Thème « chantier numérique » : nuit graphite, plan cyan, signalisation orange.
          noir: '#05070B',
          noirSub: '#0A0F1A',
          noirLine: '#1A2231',
          black: '#05070B',
          void: '#07090E',
          surface: '#0C111B',
          darkGray: '#111826',
          lightGray: '#0A0F1A',
          line: '#1C2535',
          border: '#161E2C',
          text: '#EDF2FA',
          dim: '#A3B0C6',
          faint: '#6B7A93',
          gold: '#3CE1FF',
          goldLight: '#8AF0FF',
          blue: '#4696FF',
          safety: '#FF6B1A',
          amber: '#FFB020',
          white: '#FFFFFF',
          silver: '#C0C0C0',
          mediumGray: '#8A8A98',
        },
        // Doit rester synchronisé avec `color` dans src/lib/divisions-data.ts
        divisions: {
          epoxy: '#0E95D9',
          asphalte: '#8A94A6',
          toiture: '#E0603A',
          isolation: '#2FA086',
        },
      },
      fontFamily: {
        // Doivent référencer les variables injectées par next/font (layout.tsx),
        // sinon les @font-face générés ne sont jamais utilisés et le site retombe
        // sur les polices système.
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Échelle fluide éditoriale
        'display-xl': ['clamp(2.75rem, 8.5vw, 8rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 6vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.875rem, 4vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 8vw, 7.5rem)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-y': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.55' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '100%': { transform: 'translate3d(60px,40px,0) scale(1.12)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        'dot-pulse': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.8)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'float-y': 'float-y 6s ease-in-out infinite',
        'line-grow': 'line-grow 1.1s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-ring': 'pulse-ring 2.8s cubic-bezier(0.16,1,0.3,1) infinite',
        marquee: 'marquee 42s linear infinite',
        drift: 'drift 18s ease-in-out infinite alternate',
        blink: 'blink 1s steps(1) infinite',
        'dot-pulse': 'dot-pulse 1.8s ease-in-out infinite',
        scan: 'scan 3.2s cubic-bezier(0.65,0,0.35,1) infinite',
      },
    },
  },
  plugins: [],
};
