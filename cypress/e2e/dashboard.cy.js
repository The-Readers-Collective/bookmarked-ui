import User from '../fixtures/Dashboard.json'
import DeleteBook from '../fixtures/DeleteBook.json'

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

    it(`should display a user's bookshelf separated by 'My Books' and 'My Bookmarks'`, () => {
      cy
        .get('[data-cy="shelf-container"]').find('[data-cy="My Books"]')
      cy
        .get('[href="/3"] > [data-cy="cover"] > [data-cy="cover-image"]')
        .get('[data-cy="cover-image"]').should('be.visible')
      cy
        .get('[href="/9"] > [data-cy="cover"] > [data-cy="cover-image"]')
        .get('[data-cy="cover-image"]').should('be.visible')

      cy
        .get('[data-cy="shelf-container"]').find('[data-cy="My Bookmarked Books"]')
        .get(':nth-child(4) > .swiper > .swiper-wrapper > .swiper-slide-duplicate-active > :nth-child(1) > a > [data-cy="cover"] > [data-cy="cover-image"]')
        .get('[data-cy="cover-image"]').should('be.visible')
    })

    
    it('should be able to delete a book from the My Books or My Bookmarked Books shelves', () => {
      cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', DeleteBook).as('DeleteBook')
      cy.get('.swiper-slide-prev > :nth-child(1) > [data-cy="delete-book-btn"]').first().click()
    })
    
    it('should display a footer with a link to GitHub', () => {
      cy.get('[data-cy="footer"]').contains(`Visit us at The Reader's Collective`)
    })
    
    it('should be able to click on a book cover and be led to the Single Book View page', () => {
      cy
        .get('[href="/9"] > [data-cy="cover"] > [data-cy="cover-image"]').first().click()
        .url().should('eq', 'http://localhost:3000/9')
        
    })
    
  }) 
  
