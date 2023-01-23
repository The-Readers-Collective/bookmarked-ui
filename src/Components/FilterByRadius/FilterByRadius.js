import React, { useState } from 'react'
import './FilterByRadius.css'

const FilterByRadius = () => {
    const [radius, setRadius] = useState()

    const handleClick = () => {

    }

  return (
    <div className='radius' data-cy='radius'>
        <select data-cy="select-radius" className="select-radius" name='radius' value={radius}
        onChange={(event) => setRadius(event.target.value)} 
        >
            <option value=''>Select distance</option>
            <option value='5'>5 miles</option>
            <option value='10'>10 miles</option>
            <option value='15'>15 miles</option>
            <option value='20'>20 miles</option>
            <option value='25'>20+ miles</option> 
            {/* the value for 20+ will need to change in order to show all */}
        </select>
    <button data-cy='radius-btn' className='radius-button' disabled={!radius} onClick={handleClick}
    > 
    Filter
    </button>
  </div>
  )
}

export default FilterByRadius
