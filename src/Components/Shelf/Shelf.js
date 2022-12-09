import React from 'react'
import Cover from '../Cover/Cover'

const Shelf = ({ myShelfBooks, ownedBooks, bookmarkedBooks }) => {

  const bookCovers = (books) => books.map(book => {
    console.log('book', book)
    return (
      <Cover 
        fromShelf={true}
        cover={book.book.bookCover}
        id={book.book.id}
        key={book.book.id}
        available={book.book.available}
      />
    )
  }) 

  const shelfName = myShelfBooks ? "My Books" : "My Bookmarked Books"
  
  return (
    <div data-cy="shelf-container" className="shelf-container">
      <h3 data-cy={shelfName} className="shelf-name">{shelfName}</h3>
      {shelfName === 'My Books' ? bookCovers(ownedBooks) : bookCovers(bookmarkedBooks)}
    </div>
  )
}

export default Shelf
