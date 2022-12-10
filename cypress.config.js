const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // component testing node events setup code
    },
  },
})





