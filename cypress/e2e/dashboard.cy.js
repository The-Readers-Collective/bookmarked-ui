import User from '../fixtures/Dashboard.json'
import DeleteBook from '../fixtures/DeleteBook.json'
import SingleBook from '../fixtures/SingleView.json'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
    cy.visit('/')
  })

  it('should have a title, tagline, and navigation buttons to browse all books and add a book', () => {
    cy.get('[data-cy="app-title"]').contains('Bookmarked')
    cy.get('[data-cy="app-tagline"]').contains('Where Book Lovers Gather')
    cy.get('[data-cy="page-name"]').contains('My Bookshelf')
    cy.get('[data-cy="browse-button"]')
    cy.get('[data-cy="browse-button"]')
  })

it(`should display an error message (500 status code) if user's books are not fetched`, () => {
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
      cy.visit("/")
      cy.contains('Error : Response not successful: Received status code 500')
  });


  it(`should display a user's bookshelf separated by 'My Books' and 'My Bookmarks'`, () => {
    cy
      .get('[data-cy="shelf-container"]').find('[data-cy="My Books"]')
    cy
      .get('[data-cy="cover"] > [data-cy="cover-image"]')
      .get('[data-cy="cover-image"]').should('be.visible')
    cy
      .get('[data-cy="cover"] > [data-cy="cover-image"]')
      .get('[data-cy="cover-image"]').should('be.visible')

    cy
      .get('[data-cy="shelf-container"]').find('[data-cy="My Bookmarked Books"]')
      .get('[data-cy="cover"] > [data-cy="cover-image"]')
      .get('[data-cy="cover-image"]').should('be.visible')
  })

  it('should be able to delete a book from the My Books or My Bookmarked Books shelves', () => {
    cy.get('.swiper-slide-prev > :nth-child(1) > [data-cy="delete-book-btn"]').first().click({force:true}).wait(1000)
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', DeleteBook).as('DeleteBook')
  })
  
  it('should display a footer with a link to GitHub', () => {
    cy.get('[data-cy="footer"]').contains(`The Reader's Collective`)
  })
  
  it(`should be able to click on a book cover and be led to a page to see the book's details`, () => {
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User').wait('@User')
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', SingleBook).as('SingleBook')
    cy.get(':nth-child(2) > .swiper > .swiper-wrapper > .swiper-slide-prev > .cover-container > a > [data-cy="cover"] > [data-cy="cover-image"]').click({force:true}).wait('@SingleBook')
    cy.url().should("include", "http://localhost:3000/9")
    cy.get('[data-cy="book-title"]').contains(`Caliban's War`)
  })

}) 

