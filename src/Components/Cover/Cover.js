import React from 'react'
import { Link } from 'react-router-dom'

const Cover = ({ cover, id }) => {
  return (
    <Link to={`/${id}`}> 
      <div>
        <img src={cover} alt='book name'/>
      </div>
    </Link>
  )
}

export default Cover
