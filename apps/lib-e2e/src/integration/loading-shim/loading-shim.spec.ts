describe('lib: LoadingShim component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loadingshim--visible'));

  it('should render the component', () => {
    cy.get('.MuiCircularProgress-svg').should('be.visible');
  });
});
