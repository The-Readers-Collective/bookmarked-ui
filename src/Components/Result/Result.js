import React from 'react'

const Result = ({id, key, cover}) => {
  return (
    <div className='result' data-cy='result'>
      <img data-cy="book-cover" src={cover} alt="Book Cover" className="book-cover" />
      <button 
        data-cy='search-add-book-btn'> 
        Add this book to my shelf!
        {/* // onClick={(event)=> handleClick(event)}>Search */}
        </button>
    </div>
  )
}

export default Result
