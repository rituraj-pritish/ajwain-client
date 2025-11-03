describe('workspace flows', () => {
  before(() => {
    cy.login('email@email.com', 'password')
  })

  it('creates a workspace', () => {
    cy.get('[data-testid="add-workspace-button"]').click()
    cy.get('[data-testid="name"]').type('Frontend')

    cy.get('[data-testid="add-workspace-form-submit-button"]').click()
  })

  it('creates a board', () => {
    cy.get('button[data-testid="workspace-menu-trigger"]').click()
    cy.get('[data-testid="add-board-button"]').click()
    cy.get('[data-testid="name"]').type('Frontend board')

    cy.get('[data-testid="add-and-update-board-form-submit-button"]').click()
  })

  it('redirects to board', () => {
    cy.contains('[data-testid="nav-workspace-collapsible"]', 'Frontend').click()
    cy.get('[data-testid="nav-board-link"]')
      .contains('span', 'Frontend board')
      .click()

    cy.url().should('match', /\/project\/workspace\/\d+\/board\/\d+/)
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
    cy.get(
      `[data-day="${('0' + day).slice(-2)}/${('0' + (now.getMonth() + 1)).slice(-2)}/${fullYear}"`,
    ).click()

    cy.get('[data-testid="create-task-form-button"]').click()

    cy.contains('td', 'Task 1').should('be.visible')
  })
})
