module.exports = {
  plugins: {
    // Correct way to include Tailwind CSS as a PostCSS plugin
    "@tailwindcss/postcss": {}, // <--- Changed this line
    autoprefixer: {},
  },
};
