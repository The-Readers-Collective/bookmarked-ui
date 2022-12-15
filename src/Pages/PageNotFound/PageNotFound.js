import React from 'react'
import { Link } from 'react-router-dom'
import missingPage from '../../Images/teared-book.png'

const PageNotFound = () => {
  return (
    <div>
      <div className='number-error container'>
        <div className='number'>4</div>
        <img className='error-image' src={missingPage} alt='error design' />
        <div className='number'>4</div>
      </div>
      <p>Whoops! The page you are looking for cannot be found.</p>
      <Link to="/">
          <button className="button">Return Home</button>
        </Link>
    </div>
  )
}

export default PageNotFound