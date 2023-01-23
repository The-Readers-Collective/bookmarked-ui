import SearchAllBooks from '../../Components/SearchAllBooks/SearchAllBooks'
import { gql, useQuery } from '@apollo/client'
import Cover from '../../Components/Cover/Cover.js'
import './BrowseAllBooks.css'
import React, { useState } from 'react';
import FilterByRadius from '../../Components/FilterByRadius/FilterByRadius';

const BrowseAllBooks = () => {
  const [searchTitle, setSearchTitle] = useState('')
  const [results, setResults] = useState([])
  const [resultsRequested, setResultsRequested] = useState(false)

  const GET_BROWSE_ALL_BOOKS = gql`
    query GetBrowseAllBooks {
        books {
          id
          googleBookId
          author
          bookTitle
          bookCover
          condition
          available
        }
      }
  `;

  let allBrowsedCovers;

  const { loading, error, data } = useQuery(GET_BROWSE_ALL_BOOKS)
  
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p className="loading-message">Loading...</p>
  
  if (data) {
    allBrowsedCovers = data.books.map(userBook => {
      return (
        <Cover 
        id={userBook.id}
        key={userBook.id} 
        author={userBook.author} 
        title={userBook.bookTitle} 
        cover={userBook.bookCover}
        available={userBook.available}
        />
        )
      })
    }
    
  let bookData = data.books
  
  const filteredSearch = (event) => {
    event.preventDefault()
    const filterBooks = bookData.filter((book) => {
      return book.bookTitle.toUpperCase().includes(searchTitle.toUpperCase())
    })
    setResults(filterBooks)

  }
 
  const message = <p className="loading-message">Looks like we have no matching results! Double check your search query, or check back later.</p>

  const searchResults = results.map((userBook) => {
    return (
      <Cover 
        id={userBook.id}
        key={userBook.id} 
        author={userBook.author} 
        title={userBook.bookTitle} 
        cover={userBook.bookCover}
        available={userBook.available}
      />
      )
  })
   
  return (
    <div data-cy="browse-books-container" className="browse-books-container">
      <p data-cy="browse-header" className="browse-header">Browse to see what books are available for borrowing</p>
  
      <SearchAllBooks 
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        filteredSearch={filteredSearch}
        setResults={setResults}
        setResultsRequested={setResultsRequested}
      />
      <p className='browse-header'>or filter by distance</p>
      <FilterByRadius />
      <div data-cy="all-books-container" className="all-books-container">
        {searchTitle ? searchResults : allBrowsedCovers} 
      </div> 
      {!searchResults.length && resultsRequested && message}
    </div>
  )
} 

export default BrowseAllBooks