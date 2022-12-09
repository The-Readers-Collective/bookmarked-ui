import React from 'react'
import browsedBooks from '../../Pages/BrowseAllBooks/BrowseAllBooks'

const SearchAllBooks = ({ searchTitle, setSearchTitle, filteredSearch }) => {
  return (
    <form>
      <input 
        type="text" 
        placeholder='Title'
        name='title'
        value={searchTitle}
        data-cy='input'
        onChange={event => setSearchTitle(event.target.value)}    
        >
      </input>
      <button onClick={event => filteredSearch(event)}>Submit</button>
    </form>
    
  )
}

export default SearchAllBooks
