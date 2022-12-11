import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
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

  // const ADD_BOOK = gql`
  // mutation addBook($input: CreateBookInput!) {
  //   createBook(input: $input) {
  //       googleBookId: "E-kdBQAAQBAJ"
  //       isbn13: "9781619634459"
  //       author: "Sarah J. Maas"
  //       bookTitle: "A Court of Thorns and Roses"
  //       bookCover: "http://books.google.com/books/content?id=E-kdBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  //       pgCount: 356
  //       description: "Placeholding description"
  //       category: "Fiction"
  //       condition: "Excellent"
  //       available: true
  //       userId: 1
  //     }){
  //     book {
  //       id,
  //       googleBookId,
  //       isbn13,
  //       author,
  //       bookTitle,
  //       bookCover,
  //       pgCount,
  //       description,
  //       category,
  //       condition,
  //       available,
  //       updatedAt
  //     }
  //     errors
  //   }
  // }
  // `

  // const [addBook, { loading, error}] = useMutation(ADD_BOOK)
  
  let bookResults;
 
    const [
      getSearchResults,
      { loading, data, error }
    ] = useLazyQuery(SEARCH_BOOK)
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


  
  return (
    <div className='add-book-container' data-cy='add-book-container'>
      <h3 className='title' data-cy='add-book-title'>Search books to add to your shelf!</h3>
      <input 
        type="text" 
        placeholder='Book Name -- Required'
        value={bookSearchTerm}
        onChange={(event) => setBookSearchTerm(event.target.value)}
      />
      <button onClick={() => bookSearchTerm ? getSearchResults( {variables: { title: bookSearchTerm.toUpperCase()}}) : undefined }>Search for results</button>
     <div data-cy="searched-books-container" className="searched-books-container">
      {!bookResults && error && <p>No results found. Please modify your search and try again.</p>}
      {bookResults && <p>Please add a condition to your book you wish to save and then hit "Add this book to my shelf" button</p>}
      {bookResults}
      </div>
    </div>
  )
}

export default AddBookForm
