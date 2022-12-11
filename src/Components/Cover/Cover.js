import React from 'react'
import { Link } from 'react-router-dom'

import './Cover.css'

const Cover = ({ cover, id, available, deleteBook }) => {

  return (
    <div>
    <Link to={`/${id}`}> 
      <div data-cy='cover' className='cover' id={id} style={!available ? {opacity: '0.2'} : {}}>
        <img data-cy='cover-image' className='cover-image' src={cover} alt='book name'/>
      </div>
    </Link>
      <button onClick={() => deleteBook(id)}>Delete</button>
    </div>
  )
}

export default Cover
