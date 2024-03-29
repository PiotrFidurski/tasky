import { format } from 'date-fns';

describe('login', () => {
  const username = Cypress.env('TEST_USERNAME');
  const password = Cypress.env('TEST_PASSWORD');

  it('should perform typical user login flow', () => {
    cy.visit('/login');

    cy.findByRole('textbox', { name: /username/i })
      .as('usernameInput')
      .should('have.attr', 'required');

    cy.findByLabelText(/password/i)
      .as('passwordInput')
      .should('have.attr', 'required');

    cy.get('@passwordInput').should('have.attr', 'minLength', 8);

    cy.get('@usernameInput').type(username);

    cy.get('@passwordInput').type(`${password}{enter}`);

    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/${format(new Date(), 'yyyy-MM-dd')}`
    );

    cy.getCookie('_auth').should('exist');

    cy.findByRole('button', { name: /open menu/i }).click();

    cy.findByRole('menuitem', { name: /logout/i }).trigger('keydown', {
      key: 'Enter',
    });

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
    cy.get('@passwordInput').type(`Verysecret55%sss{enter}`);

    cy.findByText(/Username must be at least 3 characters long./i);

    cy.get('@usernameInput').clear().type(`${username}{enter}`);

    cy.findByText(/Wrong password./i);

    cy.url().should('not.eq', `${Cypress.config().baseUrl}/home`);

    cy.getCookie('_auth').should('not.exist');
  });
});
