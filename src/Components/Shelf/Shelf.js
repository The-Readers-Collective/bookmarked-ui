import React from 'react'
// import Cover from '../Cover/Cover'

const Shelf = ({ myShelfBooks }) => {
  //const myBooks = ARRAY.map(book => {
  //   return (
  //     <Link><Cover fromShelf={true}/></Link>
  //   )
  // })
  //since we're filtering the mass array of books based on their status, maybe use filter instead of map?
  const shelfName = myShelfBooks ? "My Books" : "My Bookmarked Books"
    
  return (
    <div data-cy="shelf-container" className="shelf-container">
      <h3 data-cy={shelfName} className="shelf-name">{shelfName}</h3>
      {/* {myBooks} */}
    </div>
  )
}

export default Shelf
