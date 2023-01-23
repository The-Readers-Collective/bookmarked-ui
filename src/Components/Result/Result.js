import React, { useEffect, useState } from 'react'
import './Result.css'

const Result = ({id, cover, addBookToShelf}) => {
  let initialText = "Add to Shelf"
  const [conditionInput, setConditionInput] = useState(undefined)
  const [added, setAdded] = useState(initialText)

  const handleClick = () => {
    console.log('hello')
    addBookToShelf(id, conditionInput)
  }
  
  useEffect(() => {
    setAdded("Added") 
  }, [])
  
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
      <button data-cy='search-add-book-btn' className='search-add-book-button' disabled={!conditionInput} onClick={handleClick}
      > 
      {added}
      {console.log(added)}
      </button>
    </div>
  )
}

export default Result