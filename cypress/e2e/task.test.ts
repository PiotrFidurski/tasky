describe('task', () => {
  const username = Cypress.env('TEST_USERNAME');
  const password = Cypress.env('TEST_PASSWORD');
  const cookieValue = Cypress.env('TEST_COOKIE_VALUE');

  before(() => {
    cy.task('removeTask');
  });

  it('should allow users to create new tasks', () => {
    cy.request({
      url: '/login',
      method: 'POST',
      form: true,
      body: { username, password },
    }).then(() => {
      cy.setCookie('_auth', cookieValue);
    });

    cy.visit('/home');

    cy.findAllByRole('textbox', { name: /body/i }).type(
      `this is a test task.{enter}`
    );

    cy.findByText(/this is a test task./i);
  });
});
