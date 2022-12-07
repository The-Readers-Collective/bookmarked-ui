import React from 'react'
import SearchAllBooks from '../../Components/SearchAllBooks/SearchAllBooks'
import { gql, useQuery } from '@apollo/client'

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

    //const allBrowsedCover = array.map(book => {
    //    return (
    //    <Cover />
    //    )
    // })
    
  return (
    <div>
      <p>Browse</p>
      <SearchAllBooks />
      {/* {allBrowsedCovers} */}
    </div>
  )
}

export default BrowseAllBooks
