import React from 'react'

const SearchAllBooks = () => {
  // const option = ARRAY.map(category => {
  //   return <option value="category">category</option>
  // })

  return (
    <div>
      <input type="text" placeholder='Title'></input>
      <input type="text" placeholder='Author'></input>
      <label>Genre</label>
      <select>
        {/* {option} */}
      </select>
    </div>
  )
}

export default SearchAllBooks
