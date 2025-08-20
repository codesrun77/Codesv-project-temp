/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
      spacing: {
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
      },
      height: {
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'float-micro': 'float-micro 4s ease-in-out infinite',
        'pattern-drift': 'pattern-drift 20s linear infinite',
        'pattern-pulse': 'pattern-pulse 8s ease-in-out infinite',
        'pattern-rotate': 'pattern-rotate 30s linear infinite',
        'orange-glow': 'orange-glow 6s ease-in-out infinite',
        'subtle-wave': 'subtle-wave 4s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(2deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-25px) rotate(-2deg)' },
          '66%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(3deg)' },
        },
        'float-micro': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-8px) translateX(3px)' },
          '66%': { transform: 'translateY(-4px) translateX(-2px)' },
        },
        'pattern-drift': {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(10px) translateY(-5px)' },
          '50%': { transform: 'translateX(-5px) translateY(10px)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
        },
        'pattern-pulse': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
        'pattern-rotate': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'orange-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(251, 146, 60, 0.1), 0 0 40px rgba(251, 146, 60, 0.05)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(251, 146, 60, 0.2), 0 0 60px rgba(251, 146, 60, 0.1)' 
          },
        },
        'subtle-wave': {
          '0%, 100%': { transform: 'translateY(0px) scaleY(1)' },
          '50%': { transform: 'translateY(-2px) scaleY(1.02)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      }
    },
  },
  plugins: [],
};