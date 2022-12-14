import React from 'react'
import browsedBooks from '../../Pages/BrowseAllBooks/BrowseAllBooks'

const SearchAllBooks = ({ searchTitle, setSearchTitle, filteredSearch, setResults }) => {

  const clearInputs = () => {
    setResults([])
  }

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
      <button className='submit-button' onClick={event => filteredSearch(event)}>Submit</button>
      <button className='reset-button' onClick={event => clearInputs(event)}>Reset Search</button>
    </form>
    
  )
}

export default SearchAllBooks
