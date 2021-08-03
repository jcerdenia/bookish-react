describe('Bookish application', function() {
  // Test if there is a heading element on the page, and the content is Bookish.
  it('visits the bookish', function() {
    cy.visit('http://localhost:3000/')
    cy.get('h2[data-test="heading"]').contains('Bookish')
  })
})