import React, { useState } from 'react'
// import Result from '../../Components/Result/Result'

const AddBook = () => {
  const [bookSearchTerm, setBookSearchTerm] = useState('')

  // const result = array.map(result => {
  //   return (
  //     <Result />
  //   )
  // })

  const handleClick = (event) => {
    event.preventDefault()
    //query Google API 
    //return Results component with search results
    clearSearchInput()
  }

  const clearSearchInput = () => {
    setBookSearchTerm('')
  }
  
  return (
    <div className='add-book-container' data-cy='add-book-container'>
      <h3 className='title' data-cy='add-book-title'>Add a new book to your shelf</h3>
      <input 
        type="text" 
        placeholder='Book Name'
        value={bookSearchTerm}
        onChange={(event) => setBookSearchTerm(event.target.value)}
      />
      <button 
        data-cy='search-add-book-btn' 
        onClick={(event)=> handleClick(event)}>Search</button>
    </div>
  )
}

export default AddBook
