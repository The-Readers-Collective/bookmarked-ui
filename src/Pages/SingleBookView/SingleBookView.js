import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import './SingleBookView.css'

const SingleBookView = ({fromShelf, id, userId }) => {
const [isBookmarked, setIsBookmarked] = useState(false)

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

    const BOOKMARK_BOOK = gql`
        mutation createUserBook ($userId: ID!, $bookId: ID!, $status: String!){
            createUserBook(input: {
                userId: $userId,
                bookId: $bookId,
                status: $status
            }) {
                userBook {
                    userId
                    bookId
                    status
            }
                errors
                }
            }
        `;

    const [createUserBook, {createUserBookError, createUserBookLoading}] = useMutation(BOOKMARK_BOOK, {
        variables: {
                userId: parseInt(userId),
                bookId: parseInt(id),
                status: 'BOOKMARKED'
        }
    })

    function AddBookmark(id) {
        if (createUserBookError) return <p>Error : {error.message}</p>
        if (createUserBookLoading) return <p className="loading-message">Loading...</p>

        createUserBook ({
            variables: {
                input: {
                    userId: parseInt(userId),
                    bookId: parseInt(id),
                    status: 'BOOKMARKED'
                }
            }
        })
        refetch()
    }

    const { loading, error, data, refetch} = useQuery(GET_SINGLE_BOOK, {variables: {id: id}})
    
    if (error) return <p>Error : {error.message}</p>
    if (loading) return <p>Loading...</p>

    if (fromShelf) {
        return <button>Delete</button>
    }

    return (
        <div data-cy='single-book-container' className='single-book-container'>
            <div data-cy='top-single-book-container' className='top-single-book-container'>
                <div data-cy='cover-image-container' className='cover-image-container'>
                    <img  data-cy="book-cover"  src={data.book.bookCover} alt="Book Cover" className="book-cover" />
                    <button data-cy="bookmark-button"  className="bookmark-button" onClick={() => {
                        AddBookmark(data.book.id)
                        setIsBookmarked(true)}
                    }>
                        {isBookmarked ? "Success!" : "Bookmark!"}
                    </button>
                </div>
                <article className="book-major-details-container">
                    <p data-cy="book-title" className="book-title">{data.book.bookTitle}</p>
                    <p data-cy="book-author" className="book-author">By {data.book.author}</p>
                    <p data-cy="book-synopsis" className="book-synopsis">{data.book.description}</p> 
                </article>
            </div>
            <article data-cy='book-minor-details-container' className="book-minor-details-container">
                <p data-cy="book-details" className="book-details">Genre: {data.book.category}</p> 
                <p className='divider hidden'>&nbsp;&nbsp; | &nbsp; &nbsp;</p>
                <p data-cy="book-details" className="book-details">Page Count: {data.book.pgCount}</p> 
                <p className='divider hidden'>&nbsp;&nbsp; | &nbsp; &nbsp;</p>
                <p data-cy="book-details" className="book-details">ISBN: {data.book.isbn13}</p> 
                <p className='divider hidden'>&nbsp;&nbsp; | &nbsp; &nbsp;</p>
                <p data-cy="book-details" className="book-details">Condition: {data.book.condition}</p>
            </article>
        </div>
    )
}

export default SingleBookView