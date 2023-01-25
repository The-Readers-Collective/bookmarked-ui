import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../../Components/Shelf/Shelf'
import { useQuery, useMutation, gql } from '@apollo/client'
import './Dashboard.css'

const Dashboard = ({ setUserId }) => {

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

  const TOGGLE_AVAILABLE = gql `
    mutation updateBook($input: UpdateBookInput!) {
      updateBook(input: $input) {
        book {
          id
          available
        }
      }
    }
  `;

  const [ destroyBook, { deleteError, deleteLoading }] = useMutation(DELETE_BOOK, {refetchQueries: [GET_DASHBOARD]} )

  function DeleteBook(id) {
    if (deleteError) return <p>Error : {error.message}</p>
    if (deleteLoading) return <p className="loading-message">Loading...</p>
    
    destroyBook({
      variables: {
        input: {
          id: id
        }
      }
    })
  }

  const [ updateBook, { updateError, updateLoading }] = useMutation(TOGGLE_AVAILABLE)

  function UpdateStatus(id, available) {
    if (updateError) return <p>Error : {error.message}</p>
    if (updateLoading) return <p className="loading-message">Loading...</p>

   updateBook({
      variables: {
        input: {
          id: id,
          attributes: {
            available: available
          }
        }
      }
    })
  }

  const { loading, error, data } = useQuery(GET_DASHBOARD, {fetchPolicy:"cache-and-network"})
  
  useEffect(() => {
      if (data && data.user) {
        setUserId(data.user.id)
      }
    }, [setUserId, data])
  
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p className="loading-message">Loading...</p>
  
  let owned = []
  let bookmarked = []
  
  if (data) {
    const books = data.user.userBooks
    books.forEach(book => {
      book.status === 'OWNED' ? owned.push(book) : bookmarked.push(book)
    })
  }

  return (
    <div data-cy="bookshelves-container" className="bookshelves-container">
      <div className="navigation-buttons">
        <Link to="/browse">
          <button data-cy="browse-button" className="browse-button">Browse</button>
        </Link>
        <Link to="/add">
          <button data-cy="add-button" className="add-button">Add a Book</button>
        </Link>
      </div>
      <div className='shelves-container'>
        <Shelf 
          owned={true}
          ownedBooks={owned}
          myShelfBooks={true}
          deleteBook={DeleteBook}
          updateStatus={UpdateStatus}
          />
        <Shelf 
          bookmarkedBooks={bookmarked}
          owned={false}
        />
      </div>
    </div>
  )
}

export default Dashboard