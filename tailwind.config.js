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
        black: '#060607',
        black2: '#0B0C0E',
        ink: '#101214',
        panel: '#141619',
        line: '#26282D',
        silver: '#E8EAF0',
        muted: '#9BA1AB',
        dim: '#5C626B',
        cyan: '#22D3EE',
        cyanBright: '#67E8F9',
        cyanDeep: '#0891B2',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space)', 'var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -14px rgba(34,211,238,0.5)',
        'card': '0 20px 50px -20px rgba(0,0,0,0.7)',
        'card-lg': '0 40px 80px -30px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'mesh':
          'radial-gradient(55% 45% at 15% 0%, rgba(34,211,238,0.05), transparent 60%), radial-gradient(50% 40% at 90% 10%, rgba(8,145,178,0.05), transparent 60%), radial-gradient(60% 60% at 60% 100%, rgba(34,211,238,0.03), transparent 60%)',
        'mesh-blue':
          'radial-gradient(55% 45% at 20% 0%, rgba(34,211,238,0.07), transparent 55%), radial-gradient(45% 40% at 90% 20%, rgba(2,132,199,0.06), transparent 55%)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(26px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 1s ease-out both',
        floaty: 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
