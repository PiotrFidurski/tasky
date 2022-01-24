describe('login', () => {
  it('should perform typical user login flow', () => {
    cy.visit('/login');

    cy.findByRole('textbox', { name: /username/i })
      .as('usernameInput')
      .should('have.attr', 'required');

    cy.findByLabelText(/password/i)
      .as('passwordInput')
      .should('have.attr', 'required');

    cy.get('@passwordInput').should(
      'have.attr',
      'minLength',
      8
    );

    cy.get('@usernameInput').type('holo');
    cy.get('@passwordInput').type(`secret555{enter}`);

    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/home`
    );

    cy.findByText(/welcome holo/i);
  });
});
