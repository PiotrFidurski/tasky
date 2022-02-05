describe('task', () => {
  before(() => {
    cy.task('removeTask');
  });

  it('should allow users to create new tasks', () => {
    cy.login();

    cy.visit('/home');

    cy.findAllByRole('textbox', { name: /body/i }).type(
      `this is a test task.{enter}`
    );

    cy.findByText(/this is a test task./i);
  });

  it('should show field errors if there are any.', () => {
    cy.login();

    cy.visit('/home');

    cy.findAllByRole('textbox', { name: /body/i })
      .as('bodyInput')
      .type(`.{enter}`);

    cy.findByText(/Body should be at least 3 characters long./i);
  });
});
