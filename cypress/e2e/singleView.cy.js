describe('SingleView', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/1')
  })

  it('should see a book/s author, title, page count, synopsis, condition, genre', () => {
    cy.get('[data-cy="book-cover"]')
    cy.get('[data-cy="book-title"]')
    cy.get('[data-cy="book-author"]')
    cy.get('[data-cy="book-details"]')
  })

  it.skip('should be able to bookmark the single book the viewer is viewing', () => {
 
  })

  it.skip('should be able to delete this book from my bookmarked books (if routed from home) and given a confirmation message', () => {
  
  })

  it('should be able to return to browse', () => {
    cy.get('[data-cy="browse-text"]')
    .click()
  })

  it('should be able to return to home', () => {
    cy.get('[data-cy="return-home-text"]')
    .click()
  })

  it.skip('should not see the delete button if routed from browse page', () => {
    
  })

  it.skip('should see a list of other books matching the googleBookId', () => {
    
  })

}) 