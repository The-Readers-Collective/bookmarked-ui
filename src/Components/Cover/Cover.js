import React from 'react'
import { Link } from 'react-router-dom'
import './Cover.css'

const Cover = ({ cover, title, id, available, owned, deleteBook, updateStatus, wishlist, removeBook}) => {


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
        {!available && <div className='unavailable-overlay'><p className='unavailable-text cover-text'>On Loan</p></div>}
        <div data-cy='cover' id={id} className={`cover ${!available ? 'unavailable' : ''}`}>
          <img data-cy='cover-image' className='cover-image' src={cover} alt='book name'/>
          <p data-cy='cover-title' className='cover-text'>{title}</p>
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
