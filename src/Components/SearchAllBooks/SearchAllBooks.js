import React from 'react'
import { Link } from 'react-router-dom'
import './SearchAllBooks.css'

const SearchAllBooks = ({ searchTitle, setSearchTitle, filteredSearch, setResults, setResultsRequested }) => {

  const clearInputs = () => {
    setResults([])
    setSearchTitle('')
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
      <button data-cy='submit-button' className='submit-button' onClick={event => {
        filteredSearch(event)
        setResultsRequested(true)}
        }
      >
        Submit
      </button>
      <Link to="/browse">
        <button  data-cy='reset-button' className='reset-button' onClick={clearInputs}>Reset Search</button>
      </Link>
    </form>
  )
}

export default SearchAllBooks
