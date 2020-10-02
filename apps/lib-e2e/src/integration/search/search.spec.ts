describe('lib: Search component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=search--primary'));

  it('should render the component', () => {
    cy.get('.MuiButton-label').should('contain', 'Search');
  });
});
