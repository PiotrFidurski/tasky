describe('testing tests', () => {
  it('finds welcome message', () => {
    cy.visit('/');

    cy.findByRole('heading', {
      name: /Welcome to tasky/i,
    });
  });
});
