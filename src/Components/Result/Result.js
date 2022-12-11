import React, { useState } from 'react'

const Result = ({id, key, cover}) => {
  const [searchInput, setSearchInput] = useState(undefined)

  return (
    <div id={id} key={key} className='result' data-cy='result'>
      <img data-cy="book-cover" src={cover} alt="Book Cover" className="book-cover" />
          <select name='condition'
            value={searchInput} 
            onChange={(event) => setSearchInput(event.target.value)} 
          >
            <option value=''>Select Book Condition</option>
            <option value='POOR'>Poor</option>
            <option value='GOOD'>Good</option>
            <option value='EXCELLENT'>Excellent</option>
          </select>
      <button 
        data-cy='search-add-book-btn' disabled={!searchInput}> 
        Add this book to my shelf!
        {/* // onClick={(event)=> handleClick(event)}>Search */}
      </button>
    </div>
  )
}

export default Result
