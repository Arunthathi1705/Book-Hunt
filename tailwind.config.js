module.exports = {
  corePlugins: {
    preflight: false, // disables Tailwind’s CSS reset
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
