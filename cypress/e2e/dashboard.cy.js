import User from '../fixtures/dashboard.json'

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.visit('localhost:3000')
    })

    it('should have a title', () => {
      cy.get('h1').should('be.visible')
    })

    it('should have a tagline', () => {
      cy.get('h2').should('be.visible')
    })

    it('should have a button that takes a user to the browsing collection view', () => {
      cy.get('[data-cy="browse-button"]')
        .click()
        .get(':nth-child(4) > a')
        .click()
    })

    it('should have a button that takes a user to add a book view', () => {
      cy.get('[data-cy="add-button"]')
        .click()
        .get(':nth-child(4) > a')
        .click()
    })
        
    })

    it.skip('should display a users shelf', () => {
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

    it('should be able to use the browser arrow buttons to go between pages', () => {
      cy.visit("http://localhost:3000/")
      cy.get('[data-cy="browse-button"]')
        .click()
        .url().should('eq', 'http://localhost:3000/browse')
        .go('back')
        .url().should('eq', 'http://localhost:3000/')
        .go('forward')
        .url().should('eq', 'http://localhost:3000/browse')
    }) 

    it('should display a footer with a link to github', () => {
      cy.get('[data-cy="footer-text"]').should('be.visible')

        
    })

    

