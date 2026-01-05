/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // پوشه src و تمام فایل‌ها با پسوندهای html, js, jsx, ts, tsx
    './public/index.html', // در صورتی که فایل index.html در پوشه public قرار داشته باشد
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}