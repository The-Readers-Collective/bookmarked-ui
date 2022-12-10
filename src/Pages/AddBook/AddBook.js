import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
// import Result from '../../Components/Result/Result'

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

  
  const { loading, error, data } = useQuery(SEARCH_BOOK, 
    {variables: { title: bookSearchTerm }}
    )
    
    if (error) return <p>Error : {error.message}</p>
    if (loading) return <p>Loading...</p>
    
    let singleBookData = data.googleBooks
      
    const filteredSearch = (event) => {
      event.preventDefault()
      const filterBooks = singleBookData.filter((book) => {
         return book.bookTitle.toUpperCase().includes(bookSearchTerm.toUpperCase())
      })
      setSearchResults(filterBooks)
    }
  
    const clearInputs = () => {
      setSearchResults([])
    }
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
      <img  data-cy="book-cover"  src={data.googleBooks.bookTitle} alt="Book Cover" className="book-cover" />
      <input 
        type="text" 
        placeholder='Book Name'
        value={bookSearchTerm}
        onChange={(event) => setBookSearchTerm(event.target.value)}
      />
      <button onClick={event => filteredSearch(event)}>Search for results</button>
      
      {/* This second button will appear on each individual search result: not on screen until user hits filter button */}
      <button 
        data-cy='search-add-book-btn'> 
        Add this book to my shelf!
        {/* // onClick={(event)=> handleClick(event)}>Search */}
        </button>
    </div>
  )
}

export default AddBookForm
