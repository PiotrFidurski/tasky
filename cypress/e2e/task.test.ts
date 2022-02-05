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
});
