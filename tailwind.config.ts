import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        anthropic: {
          terracota: '#D97757',
          'terracota-hover': '#C4684A',
          bege: '#FAF7F2',
          dark: '#1A1A1A',
        },
        quiz: {
          correct: '#4CAF50',
          wrong: '#E53935',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
} satisfies Config;
