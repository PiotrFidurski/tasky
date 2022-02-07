describe('task', () => {
  before(() => {
    cy.task('removeTask');
  });

  beforeEach(() => {
    cy.login();
  });

  it('should allow users to create new tasks', () => {
    cy.visit('/home');

    cy.findAllByRole('textbox', { name: /body/i }).type(
      `this is a test task.{enter}`
    );

    cy.findByText(/this is a test task./i);
  });

  it('should show field errors if there are any.', () => {
    cy.visit('/home');

    cy.findAllByRole('textbox', { name: /body/i })
      .as('bodyInput')
      .type(`.{enter}`);

    cy.findByText(/Body should be at least 3 characters long./i);
  });

  it('should allow users to complete tasks.', () => {
    cy.visit('/home');

    cy.findByRole('article', { name: /this is a test task./i }).within(() => {
      cy.findByRole('button', { name: /complete task/i }).as('completeTaskBtn');

      cy.get('@completeTaskBtn').click();

      cy.findByRole('button', { name: /uncomplete task/i }).click();

      cy.get('@completeTaskBtn');
    });
  });
});
