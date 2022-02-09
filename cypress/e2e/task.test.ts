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
    cy.visit('/calendar');

    cy.findByRole('article', { name: /this is a test task./i }).within(() => {
      cy.findByRole('button', { name: /complete task/i }).as('completeTaskBtn');

      cy.get('@completeTaskBtn').click();

      cy.findByRole('button', { name: /uncomplete task/i }).click();

      cy.get('@completeTaskBtn');
    });
  });

  it('should allow users to schedule tasks for specific days.', () => {
    cy.visit('/home');

    const date = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split('T')[0];

    cy.visit(`calendar/${date}`);

    cy.findByRole('link', { name: date }).click();

    cy.findByRole('article', { name: /this is a test task./i }).within(() => {
      cy.findByRole('button', { name: /move to day!/i }).click();
    });

    cy.findByRole('region', { name: date }).within(() => {
      cy.findByText(/this is a test task./);
      cy.findByRole('button', { name: /move to backlog/i }).click();
    });

    cy.visit(`calendar/${tomorrow}`);

    cy.findByRole('link', { name: tomorrow }).click();

    cy.findByRole('article', { name: /this is a test task./i }).within(() => {
      cy.findByRole('button', { name: /move to day!/i }).click();
    });

    cy.findByRole('region', { name: tomorrow }).within(() => {
      cy.findByText(/this is a test task./);
    });
  });
});
