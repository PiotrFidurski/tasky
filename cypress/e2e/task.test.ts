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
    console.log(formData, username, password);
    cy.request({
      url: '/login',
      method: 'POST',
      form: true,
      body: { username, password },
    }).then(() => {
      cy.setCookie(
        '_auth',
        'eyJ1c2VySWQiOiI2MWZkMjdjOGE4ZjJhY2I4YjUyZjVhYjIifQ%3D%3D.qGZLza0DfGV9EfQln5zOiX2UiXjfBsBG1zcSVtQ53Vg'
      );
    });

    cy.visit('/home');

    cy.findAllByRole('textbox', { name: /body/i }).type(
      `this is a test task.{enter}`
    );

    cy.findByText(/this is a test task./i);
  });
});
