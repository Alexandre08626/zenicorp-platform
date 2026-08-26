/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        black2: '#0A0A0B',
        darkGray: '#0E0E10',
        panel: '#121316',
        panel2: '#17181C',
        line: '#22242A',
        silver: '#C9CBCF',
        muted: '#8A8D93',
        dim: '#5C5F66',
        gold: '#D4AF37',
        goldBright: '#F2C94C',
        goldSoft: '#E8C66A',
        goldDim: '#8C7420',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space)', 'var(--font-inter)', 'sans-serif'],
        tech: ['var(--font-orbitron)', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 40px -8px rgba(212,175,55,0.45)',
        'glow-gold-sm': '0 0 20px -6px rgba(212,175,55,0.5)',
        'glow-amber': '0 0 60px -10px rgba(242,201,76,0.5)',
        'card-dark': '0 20px 60px -20px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(120deg, #8C7420 0%, #D4AF37 40%, #F2C94C 60%, #D4AF37 100%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        'grid-pan': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 56px' },
        },
        'scan-line': {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'grid-pan': 'grid-pan 6s linear infinite',
        'scan-line': 'scan-line 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
}
