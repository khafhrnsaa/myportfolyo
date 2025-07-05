/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Warna Ungu/Magenta
        accent: '#9882B9',      // Lavender Terang (untuk Aksen Utama)
        'accent-dark': '#775E88', // Lavender Redup (untuk hover)
      },
    },
  },
  plugins: [],
}