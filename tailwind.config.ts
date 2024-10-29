import type { Config } from 'tailwindcss';


const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      currentColor: 'currentColor',
      base: {
        white: '#FFFFFF',
        black: '#101828',
      },
      primary: {
        100: '#D60010',
        10: '#FF8B93',
        30: '#FE3947',
        60: '#FF0A1B',
        200: '#C90514',
      },
      black: {
        100: '#111B26',
        3: '#0E1024',
        4: '#17233A',
      },
      gray: {
        4: '#D9D9E3',
        5: '#BCC3D2',
        8: '#667085',
        50: '#F9FAFB',
        100: '#495057',
        200: '#6C757D',
        300: '#929498',
        400: '#ABADB0',
        500: '#D3D6DA',
        550: '#EAECF0',
        600: '#F5F5F7',
        700: '#344054',
        900: '#101828',
      },
      success: {
        10: '#F6FEF9',
        100: '#14912D',
        20: '#DCFAE6',
        50: '#75E0A7',
        200: '#067647',
        300: '#074D31',
        500: '#17B26A',
      },
      error: {
        100: '#D92D20',
        200: '#B42318',
        300: '#912018',
      },
      purple: {
        100: '#372549',
        200: '#251534',
      },
      orange: {
        300: '#DB995A',
      },
      azure: {
        400: '#E5FAFB',
      },
      warning: '#F79009',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
