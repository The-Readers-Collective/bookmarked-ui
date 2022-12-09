import React from 'react'
import { useLocation } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'


const SingleBookView = ({fromShelf, id }) => {
    const GET_SINGLE_BOOK = gql`
        query getSingleBook ($id: ID!){
                    book(id: $id) {
                        id
                        bookTitle
                        bookCover
                        author
                        category
                        condition
                        isbn13
                        available
                        pgCount
                        description
                    }
                }
    `;

    const { loading, error, data } = useQuery(GET_SINGLE_BOOK, {variables: {id: id}})
    const location = useLocation();
    
    if (error) return <p>Error : {error.message}</p>
    if (loading) return <p>Loading...</p>


    let dynamicButton;

    if (fromShelf) {
        return <button>Delete</button>
    }

    return (
        <div>
            <p>Single book view</p>
            <button>bookmark!<button>
            <img  data-cy="book-cover"  src={data.book.bookCover} alt="Book Cover" className="book-cover" />
            <article className="book-details-container">
                <p data-cy="book-title" className="book-title">Title: {data.book.bookTitle}</p>
                <p data-cy="book-author" className="book-author">Author: {data.book.author}</p>
                <p>Synopsis: {data.book.description}</p> 
                <p data-cy="book-details" className="book-details">Genre: {data.book.category}</p> 
                <p data-cy="book-details" className="book-details">Page Count: {data.book.pgCount}</p> 
                <p data-cy="book-details" className="book-details">ISBN: {data.book.isbn13}</p> 
                <p data-cy="book-details" className="book-details">Condition: {data.book.condition}</p>
            </article>
        </div>
    )
}

export default SingleBookView
