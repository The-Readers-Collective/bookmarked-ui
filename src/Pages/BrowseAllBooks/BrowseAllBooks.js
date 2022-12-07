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
              book {
                  bookTitle
                  bookCover
                  author
                  available
              }
          }
      }
  }
  `;

    const { loading, error, data } = useQuery(GET_BROWSE_ALL_BOOKS)
    console.log('browse data',  data)
    console.log('browse error', error)

    // let allBrowsedCovers;
    // data.users.forEach(user => {
    //   allBrowsedCovers = user.userBooks.map(book => {
    //     return (
    //       <Cover />
    //     )
    //     console.log(32, allBrowsedCovers)
    //     console.log(user)
    //   })
    // })

  return (
    <div>
      <p>Browse all books</p>
      <SearchAllBooks />
      {/* {allBrowsedCovers} */}
    </div>
  )
}

export default BrowseAllBooks
