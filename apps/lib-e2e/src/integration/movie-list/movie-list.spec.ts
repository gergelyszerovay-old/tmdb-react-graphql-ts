describe('lib: MovieList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=movielist--primary'));

  it('should render the component', () => {
    cy.get('.MuiList-root').should('be.visible');
  });
});
