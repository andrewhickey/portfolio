describe('Renders the home page', () => {
  it('can see the home content', () => {
    cy.visit('/')
      .getByTestId('home-content')
      .should('contain', 'Andrew')
  })
})
