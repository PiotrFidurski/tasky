describe('task', () => {
  before(() => {
    cy.task('removeTask');
  });

  beforeEach(() => {
    cy.login();
  });

  it('should allow users to create new tasks', () => {
    cy.visit('/home');

    cy.findByRole('link', { name: /create task/i }).click();

    cy.findByRole('textbox', { name: /body/i }).type('this is a test task');

    cy.findByRole('button', { name: /add task/i }).click();

    cy.findByText(/this is a test task/i);
  });

  it('should show field errors if there are any.', () => {
    cy.visit('/home');

    cy.findByRole('link', { name: /create task/i }).click();

    cy.findByRole('textbox', { name: /body/i }).type('k');
    cy.findByRole('button', { name: /add task/i }).click();

    cy.findByText(/Body should be at least 3 characters long./i);
  });

  it('should allow users to complete tasks.', () => {
    cy.visit('/home');

    cy.findByRole('link', { name: /calendar/i }).click();

    cy.findByRole('article', { name: /this is a test task/i }).within(() => {
      cy.findByRole('button', { name: /complete task/i }).as('completeTaskBtn');

      cy.get('@completeTaskBtn').click();

      cy.findByRole('button', { name: /uncomplete task/i }).click();

      cy.get('@completeTaskBtn');
    });
  });

  it('should allow users to schedule tasks for specific days.', () => {
    cy.visit('/home');

    const date = new Date().toISOString().split('T')[0];

    cy.visit(`calendar/${date}`);

    cy.findByRole('link', { name: date }).click();

    cy.findByRole('article', { name: /this is a test task/i }).within(() => {
      cy.findByRole('button', { name: /schedule task/i }).click();
    });

    cy.findByRole('region', { name: date }).within(() => {
      cy.findByText(/this is a test task/);

      cy.findByRole('article', { name: /this is a test task/i }).within(() => {
        cy.findByRole('button', { name: /unschedule task/i }).click();
      });
    });
  });

  it('should allow users to delete a task.', () => {
    cy.visit('/home');

    cy.findByRole('link', { name: /create task/i }).click();

    cy.findByRole('textbox', { name: /body/i }).type(`delete me later{enter}`);

    cy.findByRole('article', { name: /delete me later/i }).within(() => {
      cy.findByRole('button', { name: /delete task/i }).click();
    });

    cy.findByRole('article', { name: /delete me later/i }).should('not.exist');
  });
});
