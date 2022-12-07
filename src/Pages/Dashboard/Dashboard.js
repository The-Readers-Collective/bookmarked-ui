import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../../Components/Shelf/Shelf'
// import GET_DASHBOARD from '../../queries.graphql'
import { useQuery, gql } from '@apollo/client'


const Dashboard = () => {
  const GET_DASHBOARD = gql`
    query GetDashboardBooks ($id: String!) {
        user (id: $id) {
            id
            name
            userBooks {
                bookId
                book {
                    id
                    bookTitle
                    bookCover
                    author
                    status
                    isbn13
                }
            }
        }
    }
`;

  const { loading, error, data } = useQuery(GET_DASHBOARD)

  console.log(data)

  return (
    <div data-cy="bookshelves-container" className="bookshelves-container">
      <Link to="/browse">
        <button data-cy="browse-button" className="button">Browse</button>
      </Link>
      <Link to="/add">
        <button data-cy="add-button" className="button">Add a Book</button>
      </Link>
      <Shelf myShelfBooks={true} />
      <Shelf />
    </div>
  )
}

export default Dashboard
