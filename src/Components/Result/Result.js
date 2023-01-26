import React, { useState } from 'react'
import './Result.css'

const Result = ({id, cover, addBookToShelf, added, targetBook}) => {
  const [conditionInput, setConditionInput] = useState(undefined)

  const handleClick = (id) => {
    addBookToShelf(id, conditionInput, true)
  }
  
  return (
    <div id={id} className='result' data-cy='result'>
      <img data-cy="book-cover" src={cover} alt="Book Cover" className="book-cover" />
        <select data-cy="select-search" className="select-search" name='condition'
          value={conditionInput} 
          onChange={(event) => setConditionInput(event.target.value)} 
          >
          <option value=''>Select Book Condition</option>
          <option value='POOR'>Poor</option>
          <option value='GOOD'>Good</option>
          <option value='EXCELLENT'>Excellent</option>
        </select>
      <button data-cy='search-add-book-btn' className='search-add-book-button' disabled={!conditionInput} onClick={() => handleClick(id)}
      > 
      { added && targetBook.includes(id) ? "Successfully Added" : "Add Book"}
      </button>
    </div>
  )
}

export default Result