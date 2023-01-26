import React from 'react'
import Shelf from '../../Components/Shelf/Shelf'
import { useMutation, gql } from '@apollo/client'
import './Dashboard.css'
import { GET_DASHBOARD } from '../../queries'

const Dashboard = ({ books }) => {

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
    if (deleteError) return <p>Error : {deleteError.message}</p>
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
    if (updateError) return <p>Error : {updateError.message}</p>
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
  
  let owned = []
  let bookmarked = []
    books.forEach(book => {
      book.status === 'OWNED' ? owned.push(book) : bookmarked.push(book)
    })
  
  return (
    <div data-cy="bookshelves-container" className="bookshelves-container">
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
          deleteBook={DeleteBook}
        />
      </div>
    </div>
  )
}

export default Dashboard