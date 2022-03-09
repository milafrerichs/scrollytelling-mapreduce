const production = !process.env.ROLLUP_WATCH;
module.exports = {
  content: [
    "./src/**/*.svelte",
    "./node_modules/map-reduce-game/**/*.svelte",
  ],
  theme: {
    extend: {
      colors:{
        'app-teal': {
          300:'#C5EAF5',
          400:'#C5EAE3',
          500:'#66A2AD',
        },
        'question-heading': '#624D4D',
      }
    }
  },
  plugins: [],
}
