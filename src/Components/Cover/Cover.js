import React from 'react'
import { Link } from 'react-router-dom'
import './Cover.css'

const Cover = ({ cover, title, author, id, available, owned, deleteBook, updateStatus, wishlist}) => {


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
        <div data-cy='cover' className='cover' id={id} style={!available ? {opacity: '0.3'} : {}}>
          <img data-cy='cover-image' className='cover-image' src={cover} alt='book name'/>
          <p data-cy='cover-title' className='cover-text'>{title}</p>
          <p data-cy='cover-author' className='cover-text'>{author}</p>
        </div>
      </Link>
      { owned && <button data-cy='update-available-btn' className='update-btn' onClick={(event) => 
        handleSubmit(event)}>
        {available ? 'Available' : 'On Loan'}
        </button>}
      { owned && <button data-cy='delete-book-btn' className='delete-btn' onClick={() => deleteBook(id)}>Delete</button>}
      { wishlist && <button data-cy='delete-book-btn' className='delete-btn' onClick={() => deleteBook(id)}>Remove</button>}
    </div>
  )
}

export default Cover
