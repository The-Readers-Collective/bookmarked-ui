import addBook from '../fixtures/addBook.json'

describe('Browsed Collection', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/add')
  })

    it('should be able to search a book by name or author', () => {
      cy.get('[data-cy="add-book-title"]').should('be.visible')
        .get('input')
        .type('yellow')
        .get('[data-cy="searched-result-button"]')
        .click()
        .get('[data-cy="searched-books-container"] > p').should('be.visible')
        .get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
        
    })

    it('should see an error if a users search is invalid, ', () => {
      cy.get('input')
        .type('/')
        .get('[data-cy="searched-result-button"]')
        .click()
        .get('[data-cy="searched-books-container"] > p')
        .contains('No results found.')

    })

    it('should be able to add condition to a book, and hit the button to add the book to the shelf', () => {
      cy.get('[data-cy="add-book-title"]').should('be.visible')
        .get('input')
        .type('yellow')
        .get('[data-cy="searched-result-button"]')
        .click()
        .get('[data-cy="searched-books-container"] > p').should('be.visible')
        .get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
        .get(':nth-child(2) > [data-cy="select-search"]')
        .select(1)
        cy.get('#gAuXDwAAQBAJ > [data-cy="search-add-book-btn"]')
    })

    it('should be able to return back home and see the book added to users shelf, ', () => {
      cy.get('[data-cy="return-home-text"]')
      .click()
    })

})