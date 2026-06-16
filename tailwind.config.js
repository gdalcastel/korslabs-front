/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cereal: ['"Airbnb Cereal App"', 'system-ui', 'sans-serif'],
      },
      colors: {
        rausch: '#FF385C',
        'rausch-dark': '#E31C5F',
        foggy: '#F7F7F7',
        hof: '#222222',
        bobo: '#B0B0B0',
        deco: '#DDDDDD',
        arches: '#C13515',
        quiz: {
          accent: '#5B54FF',
          'accent-dark': '#3D36E8',
        },
      },
      borderRadius: {
        airbnb: '12px',
        'airbnb-lg': '16px',
        pill: '9999px',
      },
      boxShadow: {
        airbnb: '0 6px 16px rgba(0, 0, 0, 0.12)',
        'airbnb-hover': '0 6px 20px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'quiz-gradient': 'linear-gradient(90deg, #3D36E8 0%, #5B54FF 50%, #6B63FF 100%)',
      },
      maxWidth: {
        mobile: '480px',
      },
    },
  },
  plugins: [],
};
