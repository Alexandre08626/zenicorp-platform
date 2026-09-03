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
        zenicorp: {
          black: '#05070B',
          silver: '#C0C0C0',
          gold: '#D4AF37',
          white: '#FFFFFF',
          darkGray: '#12161D',
          mediumGray: '#8A94A6',
          lightGray: '#0E1117',
          border: '#1E2530',
          surface: '#0A0D13',
          line: '#232B38',
          text: '#E8EDF4',
          dim: '#A5B0C2',
        },
        divisions: {
          epoxy: '#0E95D9',
          toiture: '#E0603A',
          asphalte: '#5B6472',
          isolation: '#2FA086',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
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
        'scan': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '0 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'float-y': 'float-y 6s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
      },
    },
  },
  plugins: [],
}