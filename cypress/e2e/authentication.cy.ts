describe('Authentication flows', () => {
  const projectAdminCredentialsFilePath =
    'cypress/fixtures/project-admin-credentials.json'

  before(() => {
    cy.readFile(projectAdminCredentialsFilePath).then((content) => {
      let apiCallFailed = false

      cy.request({
        method: 'POST',
        url: '/api/users/signin',
        body: content,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          apiCallFailed = true
        }
      })

      if (apiCallFailed) {
        return
      }

      cy.request({
        method: 'DELETE',
        url: '/api/projects/delete',
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          apiCallFailed = true
        }
      })

      if (apiCallFailed) {
        return
      }
    })
  })

  it('creates user and redirects to home page', () => {
    cy.visit('/signup')
    cy.get('[data-testid="projectName"]').type('Project')
    cy.get('[data-testid="name"]').type('Name')
    cy.get('[data-testid="email"]').type('email@email.com')
    cy.get('[data-testid="password"]').type('password')

    cy.writeFile(projectAdminCredentialsFilePath, {
      email: 'email@email.com',
      password: 'password',
    })

    cy.get('#sign-up-form').submit()
    cy.wait(1000)

    cy.url().should('contain', '/project')
  })

  it('logout user and redirects to sign in page', () => {
    cy.get('[data-testid="nav-user-menu-trigger"]').click()
    cy.get('[data-testid="logout"]').click()
    cy.wait(1000)

    cy.url().should('contain', '/signin')
  })
})
