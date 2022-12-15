import AddBook from '../fixtures/AddBook.json'

describe('Add Book', () => {
  beforeEach(() => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', AddBook)
    cy.visit('/add')
  })

  it('should have a title, tagline, and navigation buttons to return home and browse all books', () => {
    cy.get('[data-cy="app-title"]').contains('Bookmarked')
    cy.get('[data-cy="app-tagline"]').contains('Where Book Lovers Gather')
    cy.get('[data-cy="page-name"]').contains('Add a Book')
    cy.get('[data-cy="home-btn"]').contains('Return Home')
    cy.get('[data-cy="browse-btn"]').contains('Browse')
  })
  
  it('should be able to search a book by name or author', () => {
    cy.get('[data-cy="add-book-title"]').should('be.visible')
      .get('input')
      .type('Rhythm of War')
      .get('[data-cy="searched-result-button"]')
      .click()
      .get('[data-cy="searched-books-container"] > p').should('be.visible')
      .get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
  })
  
  it('should be able to add condition to a book, and hit the button to add the book to the shelf', () => {
    cy.get('[data-cy="add-book-title"]').should('be.visible')
      .get('input')
      .type('Rhythm of War')
      .get('[data-cy="searched-result-button"]')
      .click()
      .get('[data-cy="searched-books-container"] > p').should('be.visible')
      .get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
      .get(':nth-child(2) > [data-cy="select-search"]')
      .select(1)
    cy.get('#QCPBDwAAQBAJ > [data-cy="book-cover"]')
    cy.get('#QcpBDwAAQBAJ > [data-cy="search-add-book-btn"]')
  })

  it('should display an error message (500 status code) if books are unable to be searched', () => {
    cy.intercept(
      "POST",
      "https://bookmarked-api.herokuapp.com/graphql",
      {
        statusCode: 500,
        body: {
          error: "Not Found",
        },
      }
    )
    cy.visit("/add")
    cy.get('input')
      .type('/')
      .get('[data-cy="searched-result-button"]')
      .click()
      .get('[data-cy="searched-books-container"] > p')
      .contains('No results found.')
  })

  it('should display a footer with a link to GitHub', () => {
    cy.get('[data-cy="footer"]').contains(`The Reader's Collective`)
  })
})
