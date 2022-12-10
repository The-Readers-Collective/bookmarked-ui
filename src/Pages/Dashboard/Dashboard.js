import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../../Components/Shelf/Shelf'
import { useQuery, useMutation, gql } from '@apollo/client'

const Dashboard = () => {

  const GET_DASHBOARD = gql`
  query getDashboardBooks {
    user(id: 1) {
      id
      name
      userBooks {
        bookId
        status
        book {
          id
          bookTitle
          bookCover
          author
          isbn13
          available
        }
      }
    }
  }
`;


  const DELETE_BOOK = gql`
    mutation destroyBook($input: DestroyBookInput!) {
      destroyBook(input: $input) {
        id
      }
    }
  `;

  const [ destroyBook, { deleteError, deleteLoading }] = useMutation(DELETE_BOOK, {
    refetchQueries: [ 
      {query: GET_DASHBOARD,
        variables:{id: 1}
      }
    ]
  })

  function DeleteBook(id) {

    if (deleteError) return <p>Error : {error.message}</p>
    if (deleteLoading) return <p>Loading...</p>
    
    // const handleClick = () => {
      destroyBook({input: parseInt(id)})
    // }
  }
  
  const { loading, error, data } = useQuery(GET_DASHBOARD)
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>
  
  let owned = []
  let bookmarked = []
  
  if (data) {
    const books = data.user.userBooks
    books.forEach(book => {
      book.status === 0 ? owned.push(book) : bookmarked.push(book)
    })
  }
  

  return (
    <div data-cy="bookshelves-container" className="bookshelves-container">
      <Link to="/browse">
        <button data-cy="browse-button" className="button">Browse</button>
      </Link>
      <Link to="/add">
        <button data-cy="add-button" className="button">Add a Book</button>
      </Link>
      <Shelf 
        ownedBooks={owned}
        myShelfBooks={true}
        deleteBook={DeleteBook}
      />
      <Shelf 
        bookmarkedBooks={bookmarked}
      />
    </div>
  )
}


export default Dashboard
