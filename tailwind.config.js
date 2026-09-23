/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: '#0B3C5D',
        turquoise: '#2EC4B6',
        shallow: '#A8E6E2',
        sky: '#BFE6F5',
        sand: '#F6E7C8',
        foam: '#FFFDF7',
        coral: '#FF7F5C',
        sun: '#FFC857',
        night: '#071E33',
      },
      fontFamily: {
        script: ['Sacramento', 'Dancing Script', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '24px', frame: '28px' },
      boxShadow: {
        sm2: '0 2px 8px rgba(11,60,93,0.10)',
        md2: '0 12px 32px rgba(11,60,93,0.14)',
        lg2: '0 24px 64px rgba(11,60,93,0.18)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
