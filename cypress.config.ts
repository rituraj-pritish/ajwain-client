import dotenv from 'dotenv'
dotenv.config()

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    testIsolation: false,
    specPattern: [
      'cypress/e2e/authentication.cy.ts',
      'cypress/e2e/workspaces.cy.ts',
    ],
    setupNodeEvents(on, config) {
      config.baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
      return config
    },
  },
})
