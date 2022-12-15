import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
import Result from '../../Components/Result/Result'
import './AddBook.css'

const AddBook = ({ userId }) => {
  const [bookSearchTerm, setBookSearchTerm] = useState('')

  const SEARCH_BOOK = gql `
    query SEARCH_BOOK($title: String!) {
      googleBooks(title: $title)   {
        bookTitle
        bookCover
        author
        category
        description
        googleBookId
        isbn13
        pgCount
      }
    }
  `;

  const ADD_BOOK = gql`
  mutation createBook($input: CreateBookInput!) {
    createBook(input: $input) {
      book {
        id,
        googleBookId,
        isbn13,
        author,
        bookTitle,
        bookCover,
        pgCount,
        description,
        category,
        condition,
        available,
        updatedAt
      }
      errors
      }
    }
  `;

  let bookResults
  let searchResultData

  const [createBook, { addBookLoading, addBookError}] = useMutation(ADD_BOOK)
  
  function AddBookToShelf(id, conditionInput) {
    if (addBookError) return <p>Error : {error.message}</p>
    if (addBookLoading) return <p>Loading...</p>

    const selectedBook = searchResultData.find(book => book.googleBookId === id)


    createBook({
      variables: {
        input: {
          googleBookId: selectedBook.googleBookId,
          isbn13: selectedBook.isbn13,
          author: selectedBook.author,
          bookTitle: selectedBook.bookTitle,
          bookCover: selectedBook.bookCover,
          pgCount: selectedBook.pgCount,
          description: selectedBook.description,
          category: selectedBook.category,
          condition: conditionInput,
          available: true,
          userId: parseInt(userId)
        }
      }
    })
    refetch()
  }
  
  const [getSearchResults, { loading, data, error, refetch }] = useLazyQuery(SEARCH_BOOK)

  if (loading) return <p>Loading...</p>
  if (data) {
    searchResultData = [...data.googleBooks]
    bookResults = data.googleBooks.map((bookResult) => {
      return (
        <Result 
          id={bookResult.googleBookId}
          key={Math.random()} 
          cover={bookResult.bookCover}
          addBookToShelf={AddBookToShelf}
        />
      )
    })
  }

  const handleSearch = (event) => {
    getSearchResults({
      variables: { title: bookSearchTerm.toUpperCase()}
    })
    event.preventDefault()
  }
  
  return (
    <div className='add-book-container' data-cy='add-book-container'>
      <div className="add-book-search-container"> 
        <h3 className='title' data-cy='add-book-title'>Add your books to your digital bookshelf</h3>
        <p className="user-msg disclaimer">These books will be available to lend out</p>
        <div className="add-book-search-input">
          <input 
            type="text" 
            placeholder='Book Name or Author'
            value={bookSearchTerm}
            onChange={(event) => setBookSearchTerm(event.target.value)}
          />
          <button data-cy="searched-result-button" className="searched-result-button" disabled={!bookSearchTerm} onClick={(event) => handleSearch(event)}>Search for Results</button>
        </div>
      </div>
        {!bookResults && error && <p className='user-msg'>No results found. Please modify your search and try again.</p>}
        {bookResults && <p className='user-msg'>Please select the condition of your book, and click "Add to Shelf".</p>}
      <div data-cy="searched-books-container" className="searched-books-container">
        {bookResults}
      </div>
    </div>
  )
}

export default AddBook
