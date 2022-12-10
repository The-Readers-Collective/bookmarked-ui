import React from 'react'

const Result = ({id, key, cover}) => {
  return (
    <div className='result' data-cy='result'>
      <img data-cy="book-cover" src={cover} alt="Book Cover" className="book-cover" />
      <select name='book' id='book-condition'>
        <option value=''>Select Book Condition</option>
        <option value='0'>Excellent</option>
        <option value='1'>Good</option>
        <option value='2'>Poor</option>
      </select>
      <button 
        data-cy='search-add-book-btn'> 
        Add this book to my shelf!
        {/* // onClick={(event)=> handleClick(event)}>Search */}
      </button>
    </div>
  )
}

export default Result
