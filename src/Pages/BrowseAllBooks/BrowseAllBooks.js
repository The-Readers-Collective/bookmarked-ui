import SearchAllBooks from '../../Components/SearchAllBooks/SearchAllBooks'
import { gql, useQuery } from '@apollo/client'
import Cover from '../../Components/Cover/Cover.js'
import './BrowseAllBooks.css'
import React, { useState } from 'react';

const BrowseAllBooks = () => {
  const [searchTitle, setSearchTitle] = useState('')
  const [results, setResults] = useState([])

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
  if (loading) return <p>Loading...</p>
  
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
      <p data-cy="browse-header" className="browse-header">Browse to see what books are available for borrowing!</p>
  
      <SearchAllBooks 
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        filteredSearch={filteredSearch}
      />
      <div data-cy="all-books-container" className="all-books-container">
        {searchTitle ? searchResults : allBrowsedCovers} 
      </div> 
    </div>
  )
} 

export default BrowseAllBooks