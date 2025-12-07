const { withAnimations } = require("tailwindcss-animate"); // or just require("tailwindcss-animate") in newer versions

module.exports = {
  // ... your existing config
  plugins: [
    // ... other plugins
    require("tailwindcss-animate") // add this line
  ],
}