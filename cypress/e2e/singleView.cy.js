import User from '../fixtures/Dashboard.json'
import BrowsedCollection from '../fixtures/BrowsedCollection.json'
import SingleView from '../fixtures/SingleView.json'

describe('SingleView', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/1')
  })
  
it(`should display an error message (500 status code) if an individual book cannot be viewed`, () => {
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
      cy.visit("/1")
      cy.contains('Error : Response not successful: Received status code 500')
  });

  it('should see a book/s author, title, page count, synopsis, condition, genre', () => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', SingleView)
      .visit('localhost:3000/1')
      .get('[data-cy="book-cover"]')
      .get('[data-cy="book-title"]')
      .get('[data-cy="book-author"]')
      .get('[data-cy="book-synopsis"]')
      .get('[data-cy="book-minor-details-container"] > :nth-child(1)')
      .get('[data-cy="book-minor-details-container"] > :nth-child(3)')
      .get('[data-cy="book-minor-details-container"] > :nth-child(5)')
      .get('[data-cy="book-minor-details-container"] > :nth-child(7)')
  })

  it('should be able to bookmark the single book the viewer is viewing', () => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', SingleView)
      .visit('localhost:3000/1')
      .get('[data-cy="bookmark-button"]')
  })

  it('should be able to return to home', () => {
    cy.get('[data-cy="nav-bar"]')
      .get('[data-cy="return-home-text"]').click().wait(1000)
      .visit('localhost:3000/')
      .url().should('include', '/')
    
  })

  it('should be able to return to browse', () => {
    cy.get('[data-cy="nav-bar"]')
      .get('[data-cy="browse-text"]').click().wait(1000)
      .visit('localhost:3000/browse')
      .url().should('include', '/browse')
  
  })
}) 

