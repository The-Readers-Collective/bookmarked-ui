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
    cy.get('[data-cy="add-book-title"]').contains('Add your books to your digital bookshelf.')
    cy.get('[data-cy="add-book-msg"]').contains('These books will be available to lend out.')
    cy.get('input').type('Rhythm of War')
    cy.get('[data-cy="searched-result-button"]').click()
    cy.get('[data-cy="searched-books-container"]').should('exist')
    cy.get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
  })
  
  it('should be able to add condition to a book, and hit the button to add the book to the shelf', () => {
    cy.get('[data-cy="add-book-title"]').should('be.visible')
    cy.get('input').type('Rhythm of War')
    cy.get('[data-cy="searched-result-button"]').click()
    cy.get('[data-cy="searched-books-container"]').should('be.visible')
    cy.get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
    cy.get(':nth-child(2) > [data-cy="select-search"]').select(1)
    cy.get('#QCPBDwAAQBAJ > [data-cy="book-cover"]')
    cy.get('#QcpBDwAAQBAJ > [data-cy="search-add-book-btn"]')
  })

  it.only('should display an error message (500 status code) if books are unable to be searched', () => {
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
    cy.get('input').type('/')
    cy.get('[data-cy="searched-result-button"]').click()
    cy.get('[data-cy="add-book-container"] > :nth-child(2)').contains('No results found. Please modify your search and try again.')
  })

  it('should display a footer with a link to GitHub', () => {
    cy.get('[data-cy="footer"]').contains(`The Reader's Collective`)
  })
})
