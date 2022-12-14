import React from 'react'
import { Link } from 'react-router-dom'
import './Cover.css'

const Cover = ({ cover, id, available, owned, deleteBook, updateStatus }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    if(available === true ){
      available = false
    } else if (available === false){
      available = true
    }
    updateStatus(id, available)
  }

  return (
    <div className='cover-container'>
      <Link to={`/${id}`}> 
        <div data-cy='cover' className='cover' id={id} style={!available ? {opacity: '0.2'} : {}}>
          <img data-cy='cover-image' className='cover-image' src={cover} alt='book name'/>
        </div>
      </Link>
      { owned && <button data-cy='update-available-btn' className='update-btn' onClick={(event) => handleSubmit(event)}>Update Availability</button>} 
      { owned && <button data-cy='delete-book-btn' className='delete-btn' onClick={() => deleteBook(id)}>Delete</button>}
    </div>
  )
}

export default Cover
