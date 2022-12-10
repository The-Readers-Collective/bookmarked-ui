import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
// import { useMutation } from '@apollo/client';
import { useLazyQuery } from "@apollo/client";
import Result from '../../Components/Result/Result'

const AddBookForm = () => {
  const [bookSearchTerm, setBookSearchTerm] = useState('')
  const [ searchResults, setSearchResults ] = ([])

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
  `
  
  // const [addBook, { loading, error}] = useMutation(ADD_BOOK)

  
  // const { loading, error, data } = useQuery(SEARCH_BOOK, 
  //   )
  let bookResults;
 
    const [
      getSearchResults,
      { loading, data, error }
    ] = useLazyQuery(SEARCH_BOOK)
    if (error) return <p>Error : {error.message}</p>
    if (loading) return <p>Loading...</p>;
    if (data) {
     bookResults = data.googleBooks.map((bookResult) => {
      return (
        <Result 
          id={bookResult.id}
          key={bookResult.id} 
          cover={bookResult.bookCover}
        />
      )
     })
    }
  
    // const clearInputs = () => {
    //   setSearchResults([])
    // }
    // const clearInputs = () => {
  //   setBookSearchTerm('')
  // }

  // const handleClick = (event) => {
  //   event.preventDefault()
  //     if (bookSearchTerm) {
  //       addBook({
  //         variables: {
  //           input: {
  //             bookTitle: `${bookTitle}`,
  //             bookCover: `${bookCover}`,
  //             author: `${author}`,
  //             category: `${category}`,
  //             description: `${description}`,
  //             googleBookId: `${googleBookId}`,
  //             isbn13: `${isbn}`,
  //             pageCount: `${pageCount}`
  //           }
  //         }
  //       })
  //     }
  //   refetch()
  //   clearSearchInput()
  // }


  
  return (
    <div className='add-book-container' data-cy='add-book-container'>
      <h3 className='title' data-cy='add-book-title'>Search books to add to your shelf!</h3>
      <input 
        type="text" 
        placeholder='Book Name'
        value={bookSearchTerm}
        onChange={(event) => setBookSearchTerm(event.target.value)}
      />
      <button onClick={() => getSearchResults( {variables: { title: bookSearchTerm.toUpperCase() }})}>Search for results</button>
      <div data-cy="searched-books-container" className="searched-books-container">
        {bookResults}
      </div>
    </div>
  )
}

export default AddBookForm
