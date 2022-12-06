import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../../Components/Shelf/Shelf'

const Dashboard = () => {

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
