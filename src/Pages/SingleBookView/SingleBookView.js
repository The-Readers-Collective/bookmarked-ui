import React from 'react'
import { useLocation } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'


const SingleBookView = ({fromShelf}) => {
    const GET_SINGLE_BOOK = gql`
        query getSingleBook {
            users {
                userBooks {
                    bookId
                    status
                    book {
                        id
                        bookTitle
                        bookCover
                        author
                        category
                    
                        
                        condition
                        isbn13
                        available
                    }
                }
            }
        }
    `;
    //Add pageCount and synopsis back in

    const { loading, error, data } = useQuery(GET_SINGLE_BOOK)

    console.log('single book data', data)
    console.log('single book error', error)
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
