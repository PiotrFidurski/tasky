describe('login', () => {
  it('should perform typical user login flow', () => {
    cy.visit('/login');

    cy.findByRole('textbox', { name: /username/i })
      .as('usernameInput')
      .should('have.attr', 'required');

    cy.findByLabelText(/password/i)
      .as('passwordInput')
      .should('have.attr', 'required');

    cy.get('@passwordInput').should('have.attr', 'minLength', 8);

    cy.get('@usernameInput').type('chimson');
    cy.get('@passwordInput').type(`Ccm5555%{enter}`);

    cy.url().should('eq', `${Cypress.config().baseUrl}/home`);

    cy.findByText(/welcome chimson/i);

    cy.getCookie('_auth').should('exist');

    cy.findByRole('button', { name: /logout/i }).click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);

    cy.getCookie('_auth').should('not.exist');
  });

  it('should display errors when logging in', () => {
    cy.visit('/login');

    cy.findByRole('textbox', { name: /username/i })
      .as('usernameInput')
      .should('have.attr', 'required');

    cy.findByLabelText(/password/i)
      .as('passwordInput')
      .should('have.attr', 'required');

    cy.get('@passwordInput').should('have.attr', 'minLength', 8);

    cy.get('@usernameInput').type('ch{enter}');
    cy.get('@passwordInput').type(`Verysecret55%ss{enter}`);

    cy.findByText(/Username must be at least 3 characters long./i);

    cy.get('@usernameInput').clear().type('chimson{enter}');

    cy.findByText(/The password you provided doesn't match./i);

    cy.url().should('not.eq', `${Cypress.config().baseUrl}/home`);

    cy.getCookie('_auth').should('not.exist');
  });
});
