/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,ejs}', // Inclut tous les fichiers EJS dans le dossier views
    './public/**/*.{html,js}',  // Inclut tous les fichiers HTML et JS dans le dossier public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
