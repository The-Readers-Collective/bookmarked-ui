import React from 'react'
import { useLocation } from 'react-router-dom'

const SingleBookView = ({fromShelf}) => {
    const location = useLocation();
    let dynamicButton;

    if (fromShelf ) {
        return <button>Delete</button>
    }

    return (
        <div>
            <p>Single book view</p>
            {/* <img src={source} alt="Book Cover" className="book-cover" />
            <article className="book-details-container">
                <p>Title:{title}</p>
                <p>Author:{author}</p>
                <p>Genre:{genre}</p> 
                <p>Page Count:{pageCount}</p>
                <p>Synopsis:{synopsis}</p>
                <p>Condition:{condition}</p>
            </article> */}
        </div>
    )
}

export default SingleBookView
