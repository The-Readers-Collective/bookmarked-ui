import React, { useState } from 'react'
import './Result.css'
import Modal from 'react-modal'

const Result = ({id, cover, addBookToShelf}) => {
  const [resultChoice, setResultChoice] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [conditionInput, setConditionInput] = useState(undefined)
  const [isClicked, setIsClicked] = useState(false)

  const toggleConfirmationModal = () => {
    setResultChoice(true)
    setIsOpen(true)
  }

  const message = isClicked === true ? <p>Success!</p> : null

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
      <button 
        data-cy='search-add-book-btn' className='search-add-book-button' disabled={!conditionInput} onClick={()=> {
            addBookToShelf(id, conditionInput) 
            setIsClicked(true)
            console.log(isClicked)
            }
          }
      > 
        Add this book to my shelf!
      </button>
      {message}
    </div>
  )
}

export default Result

{/* <Modal
  isOpen={isOpen}
  onRequestClose={toggleConfirmationModal}
  contentLabel="My dialog"
  className="mymodal"
  overlayClassName="myoverlay"
  closeTimeoutMS={500}
>
  {resultChoice && <p>Success!</p> }
</Modal> */}