import React from 'react'
import Cover from '../Cover/Cover'
import './Shelf.css'

const Shelf = ({ myShelfBooks, ownedBooks, bookmarkedBooks, owned, deleteBook, updateStatus, removeBook }) => {

  const bookCovers = (books) => books.map(book => {
    return (
        <Cover 
          cover={book.book.bookCover}
          id={book.book.id}
          key={Math.random()}
          available={book.book.available}
          deleteBook={deleteBook}
          updateStatus={updateStatus}
          owned={owned}
          wishlist={bookmarkedBooks}
          removeBook={removeBook}
        />
    )
  }) 

  const shelfName = myShelfBooks ? "My Books" : "My Wishlist"
  
  return (
    <>
      <h3 data-cy={shelfName} className="shelf-name">{shelfName}</h3>
      <div data-cy="shelf-container" className="shelf-container">
        {shelfName === 'My Books' ? bookCovers(ownedBooks) : bookCovers(bookmarkedBooks)}
      </div>
    </>
  )
}

export default Shelf
