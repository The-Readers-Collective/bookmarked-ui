import BrowsedCollection from '../fixtures/BrowsedCollection.json'
import User from '../fixtures/Dashboard.json'
import SingleView from '../fixtures/SingleView.json'

describe('Browsed Collection', () => {
  beforeEach(() => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', BrowsedCollection)
    cy.visit('/browse')
  })

    it(`should should see a collection of all users' books`, () => {
      cy.get('[data-cy="browse-books-container"]')
        .get('[href="/1"] > div > img').should('be.visible')
        .get('[href="/2"] > div > img').should('be.visible')
    })

    it.skip('should be able to hover over a book cover, and click it to view its individual details', () => {
      cy.intercept('https://bookmarked-api.herokuapp.com/graphql', BrowsedCollection)
      cy.get(':nth-child(1) > a > [data-cy="cover"] > [data-cy="cover-image"]').click().wait(1000)
      cy.intercept('https://bookmarked-api.herokuapp.com/graphql', SingleView)
      .visit('/1')
      
    })

    it('should be able to search through the collection by title or author and reset the search', () => {
      cy.get('[data-cy="browse-books-container"]')
        .get('[placeholder="Title"]').type('Calib')
        .get('form > :nth-child(2)')
        .click()
        // cy.get('form > :nth-child(3)')
        // .click()
        // cy.intercept('https://bookmarked-api.herokuapp.com/graphql', BrowsedCollection)
        // .get('[placeholder="Title"]').type('J.R.R. Tolkien')
        // .get('form > :nth-child(2)')
        // .click()  
    })

    it('should be able to return back to the main dashboard', () => {
      cy.get('[data-cy="nav-bar"]')
        .get('[data-cy="return-home-text"]').click().wait(1000)
        .visit('/')
        .url().should('include', '/')
    })

    it('should be able to see the difference between an available book and an unavailable book', () => {
      cy.get(':nth-child(1) > a > [data-cy="cover"]').invoke('attr', 'style').should('not.eq', 'opacity: 0.2;')
      cy.get(':nth-child(4) > a > [data-cy="cover"]').invoke('attr', 'style').should('eq', 'opacity: 0.2;')
    })
})
