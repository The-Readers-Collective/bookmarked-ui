import { gql } from '@apollo/client'

const GET_DASHBOARD = gql`
    query GetDashboardBooks {
        users {
            id
            name
            books {
                bookTitle
                bookCover
                author
                status
                isbn13
            }
        }
    }
`;
//one query will return all books-- from there, we will need to filter books by status

const GET_SINGLE_BOOK = gql`
    query GetSingleBook ($id: String!) {
        users {
            books(id: $id) {
                bookTitle
                bookCover
                author
                genre // categories?
                status
                pageCount
                synopsis
                condition
                isbn13
            }
        }
    }
`;
//isAvailable ??

const GET_BROWSE_ALL_BOOKS = gql`
    query GetBrowseAllBooks {
        users {
            books {
                bookTitle
                bookCover
                author
                status
            }
        }
    }
`;
//going through every user to get every book they have
//querying whole database, then filtering those results on the front-end based on user's inputs of author, title, and genre

const GET_SEARCH_BOOKS = gql`
    query GetSearchBooks {
        books {
            bookTitle
            bookCover
            author
            categories
            status
        }
    }
`;
//from mothership google book api
//category === genre

export { GET_DASHBOARD, GET_SINGLE_BOOK, GET_BROWSE_ALL_BOOKS, GET_SEARCH_BOOKS }