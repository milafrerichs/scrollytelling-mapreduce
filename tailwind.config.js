const production = !process.env.ROLLUP_WATCH;
module.exports = {
  content: [
    "./src/**/*.svelte",
    "./node_modules/map-reduce-game/**/*.svelte",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
