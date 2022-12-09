describe('Browsed Collection', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/browse')
  })

    it('should should see a collection of all the users books', () => {
      cy.get('[data-cy="browse-books-container"]')
        .get('[href="/1"] > div > img').should('be.visible')
        .get('[href="/2"] > div > img').should('be.visible')
    })

    it('should be able to hover over a book cover, and click it to view its individual details', () => {
      cy.get('[data-cy="browse-books-container"]')
        .get('[href="/1"] > div > img').should('be.visible')
        .click()
      
    })

    it('should be able to search through the collection by title, author, or genre and reset the search parameters', () => {
      cy.get('[data-cy="browse-books-container"]')
        .get('[placeholder="Title"]').type('Calib')
        .get('[placeholder="Title"]').type('James')
        .get('select')
        .get('label')
        .click()
        // .click('Sci-Fi')
        
    })

    it('should be able to return back to the main dashboard', () => {
      cy.get('[data-cy="return-home-text"]')
      .click()
    })

    it.skip('should be able to see the difference between an available book and an unavailable book', () => {
      cy.get('h1').should('be.visible')
    })

})