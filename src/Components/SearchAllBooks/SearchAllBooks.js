import React from 'react'
import { useState } from 'react';
import browsedBooks from '../../Pages/BrowseAllBooks/BrowseAllBooks'

const SearchAllBooks = ({ searchTitle, setSearchTitle, filteredSearch }) => {
  const [results, setResults] = useState([])
  const [message, setMessage] = useState('Search for a book')
  const [searchAuthor, setSearchAuthor] = useState('')
  // const [filterCategory, setFilterCategory] = useState(["All"])

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
      {/* <input 
        type="text" 
        placeholder='Author'
        name='author'
        value={searchAuthor}
        data-cy='input'
        onChange={setSearchAuthor(event.target.value)}
        >
      </input> */}
      {/* <label>Genre</label> */}
      {/* <select
      onChange={(e) => {
      // setFilterParam(e.target.value);
       }}
       className="custom-select-category"
       aria-label="Filter books by category">
        <option value="All">Filter By category</option>
        <option value="Sci-fi">Sci-fi</option>
        <option value="Adventure">Adventure</option>
        <option value="Childrens Book">Childrens Book</option>
        <option value="Juvenile Fiction">Juvenile Fiction</option>
        <option value="Fiction">Fiction</option>
        <option value="Young Adult Fiction">Young Adult Fiction</option>
        <option value="Magic">Magic</option>
        <option value="Biography & Autobiography">Biography & Autobiography</option>
        <option value="Brothers and sisters">Brothers and sisters</option>
      </select> */}
      <button onClick={event => filteredSearch(event)}>Submit</button>
    </form>
    
  )
}

export default SearchAllBooks
