import React from 'react'
import { Link } from 'react-router-dom'
import './Cover.css'

const Cover = ({ cover, id, available }) => {
  return (
    <Link to={`/${id}`}> 
      <div data-cy='cover' className='cover'>
        <img data-cy='cover-image' className='cover-image' src={cover} alt='book name'/>
      </div>
    </Link>
  )
}

export default Cover
