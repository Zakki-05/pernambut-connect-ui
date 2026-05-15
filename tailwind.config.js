/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        surface: {
          DEFAULT: '#ffffff',
          2: '#f8fafc',
          3: '#f1f5f9',
          dark: '#0c1410',
          dark2: '#141f18',
          dark3: '#1a2b1f',
        },
        ink: {
          DEFAULT: '#0f1923',
          2: '#374151',
          3: '#6b7280',
          4: '#9ca3af',
          dark: '#f0fdf4',
          dark2: '#bbf7d0',
          dark3: '#4b6e5a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'brand':    '0 4px 24px rgba(22,163,74,0.25)',
        'brand-sm': '0 2px 12px rgba(22,163,74,0.2)',
        'card':     '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card-md':  '0 4px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.06)',
        'glow':     '0 0 30px rgba(22,163,74,0.3)',
        'nav':      '0 -2px 20px rgba(0,0,0,0.06)',
        'nav-dark': '0 -2px 20px rgba(0,0,0,0.4)',
        'modal':    '0 24px 64px rgba(0,0,0,0.18)',
      },
      animation: {
        'fade-up':    'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':    'fadeIn 0.25s ease forwards',
        'slide-down': 'slideDown 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':   'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer':    'shimmer 1.6s linear infinite',
        'pulse-dot':  'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: 0 },                                 to: { opacity: 1 } },
        slideDown: { from: { opacity: 0, transform: 'translateY(-12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: 0, transform: 'scale(0.95)' },       to: { opacity: 1, transform: 'scale(1)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseDot:  { '0%,100%': { transform: 'scale(1)', opacity: 1 }, '50%': { transform: 'scale(1.4)', opacity: 0.6 } },
      },
      backgroundImage: {
        'hero-pattern': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
      },
      backgroundSize: {
        'pattern': '22px 22px',
      },
    },
  },
  plugins: [],
}
