/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vital-mint': '#00C9A7',
        'coral-energy': '#FF6B6B',
        'citrus-glow': '#FFD166',
        'soft-cloud': '#F9FAFB',
        'graphite-ink': '#2E2E2E',
        'leaf-green': '#8BC34A',
        'alert-red': '#E53935',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 201, 167, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 201, 167, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00C9A7, #FFD166)',
        'gradient-secondary': 'linear-gradient(135deg, #FF6B6B, #FFD166)',
        'gradient-hero': 'linear-gradient(135deg, rgba(0, 201, 167, 0.6), rgba(255, 209, 102, 0.6))',
      },
    },
  },
  plugins: [],
};