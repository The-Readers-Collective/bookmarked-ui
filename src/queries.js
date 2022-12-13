import { gql } from '@apollo/client'

const GET_DASHBOARD = gql`
query getDashboardBooks {
  user(id: 1) {
    id
    name
    userBooks {
      bookId
      status
      book {
        id
        bookTitle
        bookCover
        author
        isbn13
        available
      }
    }
  }
}
`;

const GET_SINGLE_BOOK = gql`
    query GetSingleBook ($id: String!) {
        users {
            userBooks {
                bookId
                book (id: $id) {
                    bookTitle
                    bookCover
                    author
                    category
                    status
                    pageCount
                    synopsis
                    condition
                    isbn13
                    available
                }
            }
        }
    }
`;

//isAvailable ??
//alphabatize properties

const GET_BROWSE_ALL_BOOKS = gql`
    query GetBrowseAllBooks {
        users {
            userBooks {
                book {
                    bookTitle
                    bookCover
                    author
                    available
                    status
                }
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
            category
            status
        }
    }
`;
//from mothership google book api
//category === genre

export { GET_DASHBOARD, GET_SINGLE_BOOK, GET_BROWSE_ALL_BOOKS, GET_SEARCH_BOOKS }