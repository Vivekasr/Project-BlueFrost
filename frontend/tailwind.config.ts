import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FEFCF6',
        sand: '#F5EFEB',
        sage: '#5E6C5B',
        'bf-rose': '#AC8087',
        sky: '#CBD9E6',
        navy: { DEFAULT: '#2F4156', soft: '#43566c' },
        ink: '#2F4156',
        muted: '#6b7889',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', '"Hoefler Text"', 'Georgia', 'serif'],
        sans: ['"Archivo"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
      },
    },
  },
  plugins: [],
} satisfies Config;
