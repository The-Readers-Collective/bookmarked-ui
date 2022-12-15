import User from '../fixtures/Dashboard.json'
import BrowsedCollection from '../fixtures/BrowsedCollection.json'
import SingleView from '../fixtures/SingleView.json'
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
    cy.get('[data-cy="add-book-title"]').should('be.visible')
      .get('input')
      .type('Rhythm of War')
      .get('[data-cy="searched-result-button"]')
      .click()
      .get('[data-cy="searched-books-container"] > p').should('be.visible')
      .get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
  })
  
  it('should be able to add condition to a book, and hit the button to add the book to the shelf', () => {
    cy.get('[data-cy="add-book-title"]').should('be.visible')
      .get('input')
      .type('Rhythm of War')
      .get('[data-cy="searched-result-button"]')
      .click()
      .get('[data-cy="searched-books-container"] > p').should('be.visible')
      .get(':nth-child(2) > [data-cy="book-cover"]').should('be.visible')
      .get(':nth-child(2) > [data-cy="select-search"]')
      .select(1)
    cy.get('#QCPBDwAAQBAJ > [data-cy="book-cover"]')
    cy.get('#QcpBDwAAQBAJ > [data-cy="search-add-book-btn"]')
  })

  it('should display an error message (500 status code) if books are unable to be searched', () => {
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
    cy.get('input')
      .type('/')
      .get('[data-cy="searched-result-button"]')
      .click()
      .get('[data-cy="searched-books-container"] > p')
      .contains('No results found.')
  })
})

describe('Browsed Collection', () => {
  beforeEach(() => {
    cy.intercept('https://bookmarked-api.herokuapp.com/graphql', BrowsedCollection)
    cy.visit('/browse')
  })

  it('should have a title, tagline, and navigation button to return home', () => {
    cy.get('[data-cy="app-title"]').contains('Bookmarked')
    cy.get('[data-cy="app-tagline"]').contains('Where Book Lovers Gather')
    cy.get('[data-cy="page-name"]').contains('Browse All Books')
    cy.get('[data-cy="home-btn"]').contains('Return Home')
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

describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', User).as('User')
    cy.visit('/')
  })

  it('should have a title, tagline, and navigation buttons to browse all books and add a book', () => {
    cy.get('[data-cy="app-title"]').contains('Bookmarked')
    cy.get('[data-cy="app-tagline"]').contains('Where Book Lovers Gather')
    cy.get('[data-cy="page-name"]').contains('My Bookshelf')
    cy.get('[data-cy="browse-button"]').contains('Browse')
    cy.get('[data-cy="add-button"]').contains('Add a Book')
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
    cy.intercept('POST', 'https://bookmarked-api.herokuapp.com/graphql', SingleView).as('SingleView')
    cy.get(':nth-child(2) > .swiper > .swiper-wrapper > .swiper-slide-prev > .cover-container > a > [data-cy="cover"] > [data-cy="cover-image"]').click({force:true}).wait('@SingleView')
    cy.url().should("include", "http://localhost:3000/9")
    cy.get('[data-cy="book-title"]').contains(`Caliban's War`)
  })

}) 

