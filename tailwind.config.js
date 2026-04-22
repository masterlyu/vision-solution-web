module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7C3AED',
          light:   '#A78BFA',
          dark:    '#5B21B6',
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: { container: '1100px' },
      animation: {
        ticker:          'ticker 40s linear infinite',
        'pulse-dot':     'pulseDot 2s ease-in-out infinite',
        'fade-up':       'fadeUp 0.6s ease both',
        'marquee-left':  'marqueeLeft 28s linear infinite',
        'marquee-right': 'marqueeRight 22s linear infinite',
      },
      keyframes: {
        ticker:        { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseDot:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        fadeUp:        { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marqueeLeft:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeRight:  { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
