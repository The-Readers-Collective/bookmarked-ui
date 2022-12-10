import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
// import Result from '../../Components/Result/Result'

const AddBookForm = ({ refetch }) => {
  const [bookSearchTerm, setBookSearchTerm] = useState('')

  const SEARCH_BOOK = gql `
    query SEARCH_BOOK {
      googleBooks(bookTitle: String) {
        bookTitle
        bookCover
        author
        category
        description
        googleBookId
        isbn13
        pageCount
      }
  }
  `
  
  // const [addBook, { loading, error}] = useMutation(ADD_BOOK)

  const { loading, error, data } = useQuery(SEARCH_BOOK)

  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>

  const clearInputs = () => {
    setBookSearchTerm('')
  }

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

  const clearSearchInput = () => {
    setBookSearchTerm('')
  }
  
  return (
    <div className='add-book-container' data-cy='add-book-container'>
      <h3 className='title' data-cy='add-book-title'>Search books to add to your shelf!</h3>
      <input 
        type="text" 
        placeholder='Book Name'
        value={bookSearchTerm}
        onChange={(event) => setBookSearchTerm(event.target.value)}
      />
      <button 
        data-cy='search-add-book-btn'> 
        {/* // onClick={(event)=> handleClick(event)}>Search */}
        </button>
        <button>Add this book to my shelf!</button>
    </div>
  )
}

export default AddBookForm
