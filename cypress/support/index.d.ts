declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to log in a user.
     * @example cy.login('testuser', 'password123')
     */
    login(email: string, password: string): Chainable<any>
  }
}
