import User from '../fixtures/dashboard.json'

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', { fixture: 'dashboard.json' }).as('userBooks')
    cy.visit('/')
    cy.wait('@userBooks')
      cy.visit('/')

    })

    it.skip('should have a title and tagline', () => {
      cy.get('[data-cy="app-title"]').contains('Bookmarked')
      cy.get('[data-cy="app-tagline"]').contains('Where Book Lovers Gather')

    })

    it.skip('should have a button that takes a user to the browsing collection view when clicked', () => {
      cy.get('[data-cy="browse-button"]')
        .click()
        .get('[data-cy="browse-header"]').contains('Browse all books')
    })

    it.skip('should have a button that takes a user to add a book view when clicked', () => {
      cy.get('[data-cy="add-button"]')
        .click()
      cy.get('[data-cy="page-name"]').contains('Add a Book')
    })

    it('should display a users shelf', () => {
      cy.get('card')
       
    })

    it.skip('should display a users book marked books shelf with available and non available books', () => {
      cy.get('card')
        
    })

    it.skip('should be able to click on a book cover and be lead to the Single Book View page', () => {
      cy.get('card')
        
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

