import React from 'react'
import SearchAllBooks from '../../Components/SearchAllBooks/SearchAllBooks'
import { gql, useQuery } from '@apollo/client'
import Cover from '../../Components/Cover/Cover.js'

const BrowseAllBooks = () => {
  const GET_BROWSE_ALL_BOOKS = gql`
    query GetBrowseAllBooks {
      users {
        userBooks {
          status
          bookId
          book {
            id
            bookTitle
            bookCover
            author
            available
          }
        }
      }
    }
  `;

  let allBrowsedCovers;

  
  const { loading, error, data } = useQuery(GET_BROWSE_ALL_BOOKS)
  
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>
  
  
  if (data) {
    let books = []
    const users = data.users.forEach(user => {
      books.push(user.userBooks)
    })
    const allBooks = books.flat()

    allBrowsedCovers = allBooks.map(userBook => {
        return (
          <Cover 
          key={userBook.bookId} 
          author={userBook.book.author} 
          title={userBook.book.bookTitle} 
          cover={userBook.book.bookCover}
          />
        )
      })
    }
      
      return (
        <div>
      <p>Browse all books</p>
      <SearchAllBooks />
      {allBrowsedCovers}
    </div>
  )
} 

export default BrowseAllBooks
