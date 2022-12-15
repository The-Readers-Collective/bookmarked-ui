import BrowsedCollection from '../fixtures/BrowsedCollection.json'
import User from '../fixtures/Dashboard.json'
import SingleView from '../fixtures/SingleView.json'

describe('Browsed Collection', () => {
  beforeEach(() => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', BrowsedCollection)
    cy.visit('/browse')
  })

  it(`should display an error message (500 status code) if all browsed books are not fetched`, () => {
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
    cy.visit("/browse")
    cy.contains('Error : Response not successful: Received status code 500')
  })

  it(`should should see a collection of all users' books`, () => {
    cy.get('[data-cy="browse-books-container"]')
      .get('[href="/1"] > div > img').should('be.visible')
      .get('[href="/2"] > div > img').should('be.visible')
  })

  it(`should be able to click on a book cover to view a book's individual details`, () => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', BrowsedCollection).as('BrowsedCollection').wait('@BrowsedCollection')
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', SingleView).as('SingleView')
    cy.get(':nth-child(1) > a > [data-cy="cover"]').click({force:true}).wait('@SingleView')
    cy.url().should("include", "http://localhost:3000/1")
    cy.get('[data-cy="book-title"]').contains(`Caliban's War`)
  })

  it('should be able to search through the collection by title or author', () => {
    cy.get('[data-cy="browse-books-container"]')
    cy.get('[placeholder="Title"]').type('Calib')
    cy.get('[data-cy="submit-button"]').click({force:true})
    cy.get('[data-cy="cover"]').invoke('attr', 'id').should('eq', '1')
  })

  it.skip(`should be able to reset the search and display all users' books`, () => {
    cy.get('[data-cy="browse-books-container"]')
    cy.get('[placeholder="Title"]').type('Calib')
    cy.get('[data-cy="reset-button"]').click({force:true})
    // cy.get('[data-cy="cover"]').invoke('attr', 'id').should('eq', '1') 
    // cy.get('[data-cy="cover"]').invoke('attr', 'id').should('eq', '2') 
    // cy.get('[data-cy="cover"]').invoke('attr', 'id').should('eq', '3') 
    // cy.get('[data-cy="cover"]').invoke('attr', 'id').should('eq', '4') 
  })

  it('should be able to return back to the main dashboard', () => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', BrowsedCollection).as('BrowsedCollection').wait('@BrowsedCollection')
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
    cy.get('[data-cy="nav-bar"]')
    cy.get('[data-cy="return-home-text"]').click({force:true})
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('[data-cy="page-name"]').contains('My Bookshelf')
  })

  it('should be able to see the difference between an available book and an unavailable book', () => {
    cy.get(':nth-child(1) > a > [data-cy="cover"]').invoke('attr', 'style').should('not.eq', 'opacity: 0.2;')
    cy.get(':nth-child(4) > a > [data-cy="cover"]').invoke('attr', 'style').should('eq', 'opacity: 0.2;')
  })
})
