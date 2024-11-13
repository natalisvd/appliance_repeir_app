// tailwind.config.js
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/assets/stylesheets/**/*.scss',
    './app/assets/stylesheets/**/*.css'
  ],
  theme: {
    extend: {
      colors: {
        navy: "#001524",
        teal: "#15616D",
        cream: "#FFECD1",
        orange: "#FF7D00",
        brown: "#78290F",
      },
    },
  },
  plugins: [],
};
