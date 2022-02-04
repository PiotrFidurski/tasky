describe('task', () => {
  const username = Cypress.env('TEST_USERNAME');
  const password = Cypress.env('TEST_PASSWORD');
  before(() => {
    cy.task('removeTask');
  });
  it('should allow users to create new tasks', () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    cy.request('POST', '/login', formData);

    cy.visit('/home');

    cy.findAllByRole('textbox', { name: /body/i }).type(
      `this is a test task.{enter}`
    );

    cy.findByText(/this is a test task./i);
  });
});
