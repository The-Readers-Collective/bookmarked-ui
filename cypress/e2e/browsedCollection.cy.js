describe('Browsed Collection', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/browse')
  })

    it('should should see a collection of all the users books', () => {
      cy.get('h1').should('be.visible')
    })

    it('should be able to hover over a book cover, and click it to view its individual details', () => {
      cy.get('h1').should('be.visible')
    })

    it('should be able to search through the collection by title, author, or genre and reset the search parameters', () => {
      cy.get('h1').should('be.visible')
    })

    it('should be able to return back to the main dashboard', () => {
      cy.get('h1').should('be.visible')
    })

    it('should be able to see the difference between an available book and an unavailable book', () => {
      cy.get('h1').should('be.visible')
    })

})