describe('Authentication flows', () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const projectAdminCredentialsFilePath =
    'cypress/fixtures/project-admin-credentials.json'

  before(() => {
    cy.readFile(projectAdminCredentialsFilePath).then((content) => {
      if (content.email) {
        cy.request('POST', `${apiBaseUrl}/users/signin`, content)
        cy.request('DELETE', `${apiBaseUrl}/projects/delete`)
        cy.writeFile(projectAdminCredentialsFilePath, {})
      }
    })
  })

  it('creates user and redirects to home page', () => {
    cy.visit('/signup')
    cy.get('[data-testid="projectName"').type('Project')
    cy.get('[data-testid="name"').type('Name')
    cy.get('[data-testid="email"').type('email@email.com')
    cy.get('[data-testid="password"').type('password')

    cy.writeFile(projectAdminCredentialsFilePath, {
      email: 'email@email.com',
      password: 'password',
    })

    cy.get('#sign-up-form').submit()

    cy.url().should('contain', '/project')
  })

  it('logout user and redirects to sign in page', () => {
    cy.get('[data-testid="nav-user-menu-trigger"').click()
    cy.get('[data-testid="logout"').click()

    cy.url().should('contain', '/signin')
  })
})
