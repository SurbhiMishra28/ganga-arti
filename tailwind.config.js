/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101c26',      // the river at night
        ghat: '#f1ede5',     // sun-warmed ghat stone
        paper: '#fbfaf6',
        marigold: '#d99a06',
        sindoor: '#9e1b1f',  // auspicious vermilion, used for the booking call-to-action
        flame: '#f2a944',
      },
      fontFamily: {
        display: ['Marcellus', 'Georgia', 'serif'],
        sans: ['Mukta', 'system-ui', 'sans-serif'],
        deva: ['Tiro Devanagari Hindi', 'Noto Serif Devanagari', 'serif'],
      },
      keyframes: { marquee: { to: { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 60s linear infinite' },
    },
  },
  plugins: [],
}
