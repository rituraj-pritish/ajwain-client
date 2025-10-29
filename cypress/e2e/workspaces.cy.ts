describe('workspace flows', () => {
  before(() => {
    cy.login('email@email.com', 'password')
  })

  it('creates a workspace', () => {
    cy.get('[data-testid="add-workspace-button"]').click()
    cy.get('[data-testid="name"]').type('Frontend')

    cy.get('[data-testid="add-workspace-form-submit-button"]').click()
  })

  it('redirects to workspace', () => {
    cy.contains('a[data-testid="nav-workspace-link"]', 'Frontend').click()

    cy.url().should('contain', '/project/workspace/')
    cy.contains('[data-testid="breadcrumb"]', 'Frontend').should('be.visible')
  })

  it('creates new task', () => {
    cy.get('[data-testid="create-task-button"]').click()

    cy.get('[data-testid="title"]').type('Task 1')
    cy.get('[data-testid="member-selector"]').click()
    cy.contains('[data-testid="member-selector-option"]', 'Name').click()
    cy.contains('[data-testid="member-selector-avatar"]', 'N').should(
      'be.visible',
    )
    cy.get('[data-testid="description"]').type('description')

    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' })
    const currentMonthThreeChars = formatter.format(now)
    const fullYear = now.getFullYear()
    const day = now.getDate()

    cy.get('[aria-label="Choose the Month"]').select(currentMonthThreeChars)
    cy.get('[aria-label="Choose the Year"]').select(fullYear.toString())
    cy.contains('button', day.toString()).click()

    cy.get('[data-testid="create-task-form-button"]').click()

    cy.contains('td', 'Task 1').should('be.visible')
  })
})
