describe('testing tests', () => {
  it('finds link', () => {
    cy.visit('/');

    cy.findByRole('link', {
      name: /Deep Dive Jokes App Tutorial/i,
    });
  });
});
