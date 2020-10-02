describe('lib: MovieDetails component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=moviedetails--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Alien: Covenant');
  });
});
