const Result = ({id, key, cover, conditionInput, setConditionInput, addBookToShelf}) => {


  
  return (
    <div id={id} className='result' data-cy='result'>
      <img data-cy="book-cover" src={cover} alt="Book Cover" className="book-cover" />
          <select name='condition'
            value={conditionInput} 
            onChange={(event) => setConditionInput(event.target.value)} 
          >
            <option value=''>Select Book Condition</option>
            <option value='POOR'>Poor</option>
            <option value='GOOD'>Good</option>
            <option value='EXCELLENT'>Excellent</option>
          </select>
      <button 
        data-cy='search-add-book-btn' disabled={!conditionInput} onClick={()=> addBookToShelf(id)}> 
        Add this book to my shelf!
      </button>
    </div>
  )
}

export default Result
