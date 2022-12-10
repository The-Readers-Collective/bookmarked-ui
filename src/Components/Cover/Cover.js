import React from 'react'
import { Link } from 'react-router-dom'

import './Cover.css'

const Cover = ({ cover, id, available, deleteBook }) => {
  return (
    <Link to={`/${id}`}> 
      <div data-cy='cover' className='cover' id={id}>
        <img data-cy='cover-image' className='cover-image' src={cover} alt='book name'/>
        <button onClick={() => deleteBook(id)}>Delete</button>
      </div>
    </Link>
  )
}

export default Cover
