import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    testIsolation: false,
    specPattern: [
      'cypress/e2e/authentication.cy.ts',
      'cypress/e2e/workspaces.cy.ts',
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
