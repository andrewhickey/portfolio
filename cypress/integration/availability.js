describe('Renders the availability page', () => {
  it('can see the availability page', () => {
    cy.visit('/availability')
      .getByTestId('home-content')
      .should('contain', 'Andrew Hickey')
  })
})
