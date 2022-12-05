import { gql } from '@apollo/client'
//adding book to user's shelf
const ADD_BOOK = gql`
    mutation createNewBook ($title: String!, $author: String!, $condition: String!){
        createBook(title: $title, author: $author, condition: $condition){
        }
    }
`;
// user selects the book to add to their shelf, 'POSTing' the book's data (+ the added book's condition) to their shelf's database

//deleting book from user's shelf
const DELETE_BOOK = gql`
    mutation deleteBook{
        deleteBook() {

        }
    }
`;
//user deletes a book from their shelf, 'DELETEing' the book's data from the shelf's database

export { ADD_BOOK, DELETE_BOOK }