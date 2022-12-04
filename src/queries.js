import { gql } from '@apollo/client'
// DASHBOARD
// -pulling in a user's book'screen, whether available and unavailable
// title cover author status
const GET_DASHBOARD = gql`
    query GetDashboardBooks {
        {
            books {
                title
                cover
                author
                status
            }
        }
    }

    query GetDashboardBookmarkedBooks {
        {
            books {
                title
                cover
                author
                status
            }
        }
    }
`;

const GET_SINGLE_BOOK = gql`
    query GetSingleBook {
        {
            book {
                title
                cover
                author
                genre
                status
                pageCount
                synopsis
                condition
            }
        }
    }
`;

const GET_BROWSE_ALL_BOOKS = gql`
    query GetBrowseAllBooks {
        {
            books {
                title
                cover
                author
                status
            }
        }
    }
`;

//Passing in book title, author, and genre in as search queries as arguments

const GET_SEARCH_BOOKS = gql`
    query GetSearchBooks {
        {
            books {
                title
                cover
                author
                status
            }
        }
    }
`;