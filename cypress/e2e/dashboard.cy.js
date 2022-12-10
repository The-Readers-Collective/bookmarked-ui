import User from '../fixtures/dashboard.json'

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', { fixture: 'dashboard.json' }).as('userBooks')
      cy.visit('/')
      cy.wait('@userBooks')
    })

    it.skip('should have a title and tagline', () => {
      cy.get('[data-cy="app-title"]').contains('Bookmarked')
      cy.get('[data-cy="app-tagline"]').contains('Where Book Lovers Gather')
    })

    it.skip('should have a button that takes a user to the browsing collection view when clicked', () => {
      cy
        .get('[data-cy="browse-button"]')
        .click()
        .get('[data-cy="browse-header"]').contains('Browse all books')
    })

    it.skip('should have a button that takes a user to add a book view when clicked', () => {
      cy.get('[data-cy="add-button"]')
        .click()
      cy.get('[data-cy="page-name"]').contains('Add a Book')
    })

    it.skip(`should display a user's bookshelf separated by 'My Books' and 'My Bookmarks'`, () => {
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
        .get(':nth-child(4) > a > [data-cy="cover"]')
        .get('[data-cy="cover-image"]').should('be.visible')
    })

    it.skip('should display a users book marked books shelf with available and non available books', () => {
      cy.get('card')
        
    })

    it('should be able to click on a book cover and be led to the Single Book View page', () => {
      cy
        .get('[href="/3"] > [data-cy="cover"] > [data-cy="cover-image"]').first().click()
        .url().should('eq', 'http://localhost:3000/3')
        
    })

    it.skip('should be able to delete book from either one of my shelves', () => {
      cy.get('card')
        
    })

    it.skip('should be able to use the browser arrow buttons to go between pages', () => {
      cy.visit('/')
      cy.get('[data-cy="browse-button"]')
        .click()
        .url().should('eq', '/browse')
        .go('back')
        .url().should('eq', '/')
        .go('forward')
        .url().should('eq', '/browse')
    }) 

    it.skip('should display a footer with a link to github', () => {
      cy.get('[data-cy="footer"]').contains(`Visit us at The Reader's Collective`)

        
    })

  }) 

