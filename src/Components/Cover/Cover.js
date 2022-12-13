import React from 'react'
import { Link } from 'react-router-dom'

import './Cover.css'

const Cover = ({ cover, id, available, owned, deleteBook, updateStatus }) => {

const handleSubmit = (event) => {
  event.preventDefault()
  if(available === true ){
    available = false
    console.log('1', available)
  } else if (available === false){
    available = true
    console.log('2', available)
  }
  updateStatus(id, available)
}

  return (
    <div>
    <Link to={`/${id}`}> 
      <div data-cy='cover' className='cover' id={id} style={!available ? {opacity: '0.2'} : {}}>
        <img data-cy='cover-image' className='cover-image' src={cover} alt='book name'/>
      </div>
    </Link>
      { owned && <button onClick={(event) => handleSubmit(event)}>Update Availability</button>} 
      { owned && <button onClick={() => deleteBook(id)}>Delete</button>}
    </div>
  )
}

export default Cover
