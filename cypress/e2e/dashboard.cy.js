import User from '../fixtures/Dashboard.json'
import DeleteBook from '../fixtures/DeleteBook.json'
import SingleBook from '../fixtures/SingleView.json'

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have a title, tagline, and navigation buttons to browse all books and add a book', () => {
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
    cy.get('[data-cy="app-title"]').contains('Bookmarked')
    cy.get('[data-cy="app-tagline"]').contains('Where Book Lovers Gather')
    cy.get('[data-cy="page-name"]').contains('My Bookshelf')
    cy.get('[data-cy="browse-button"]')
    cy.get('[data-cy="browse-button"]')
  })

  it(`should display a user's bookshelf separated by 'My Books' and 'My Bookmarks'`, () => {
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
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
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
    cy.get('.swiper-slide-prev > :nth-child(1) > [data-cy="delete-book-btn"]').first().click()
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', DeleteBook).as('DeleteBook')
  })
  
  it('should display a footer with a link to GitHub', () => {
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
    cy.get('[data-cy="footer"]').contains(`The Reader's Collective`)
  })
  
  it('should be able to click on a book cover and be led to the Single Book View page', () => {
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
    cy.get(':nth-child(2) > .swiper > .swiper-wrapper > .swiper-slide-prev > .cover-container > a > [data-cy="cover"] > [data-cy="cover-image"]').click()
    cy.url().should("include", "http://localhost:3000/9")
  })

}) 

