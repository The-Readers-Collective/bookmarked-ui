import React, { useState, useEffect} from 'react'
import { Link, Route, Switch} from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Dashboard from '../Dashboard/Dashboard'
import BrowseAllBooks from '../BrowseAllBooks/BrowseAllBooks'
import SingleBookView from '../SingleBookView/SingleBookView'
import AddBook from '../AddBook/AddBook'
import PageNotFound from '../PageNotFound/PageNotFound'
import About from '../About/About'
import logo from '../../Images/bm_logo.svg'
import './App.css'

const App = () => {
  const [ userId, setUserId ] = useState(0)

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

const { loading, error, data } = useQuery(GET_DASHBOARD, {fetchPolicy:'cache-and-network', pollInterval: 500})

useEffect(() => {
  if (data && data.user) {
    setUserId(data.user.id)
  }
}, [setUserId, data])

if (error) return <p>Error : {error.message}</p>
if (loading) return <p className='loading-message'>Loading...</p>

if (data) {
  return (
    <div>
      <nav className='top-nav nav-bar'>
        <div className='app-info'>
          <img data-cy='logo-image' className='logo-image' src={logo} alt='logo design'/>
          <div data-cy='app-info-container' className='app-info-container'>
            <h3 data-cy='page-name' className='page-name'>Denver</h3>
          </div>
        </div>
          <input id='menu-toggle' type='checkbox' />
          <label className='menu-button-container' htmlFor='menu-toggle'>
        <div className='menu-button'></div>
        </label>
        <ul data-cy='nav-links' className='menu nav-links'>
          <li><Link data-cy='about-text' className='link' to='/'>About</Link></li>
          <li><Link data-cy='browse-text' className='link' to='/browse'>Browse</Link></li>
          <li><Link data-cy='add-text' className='link' to='/add'>Add</Link></li>
          <li><Link data-cy='manage-text' className='link' to='/manage'>Manage</Link></li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route exact path='/' render={() => 
            <About 
            />
          }/>
          <Route exact path='/manage' render={() => 
            <Dashboard 
              books={data.user.userBooks}
              userId={userId}
            />
          }/>
          <Route path='/browse' render={() => 
            <BrowseAllBooks userId={userId} />
          }/>
          <Route path='/add' render={() =>
            <AddBook 
              userId={userId}
            />
          }/>
          <Route exact path="/:id" render={({match}) => 
            <SingleBookView 
              id={match.params.id} 
              userId={userId} 
              books={data.user.userBooks} />
          }/>
          <Route path='*' render={() => 
            <PageNotFound />
          }/>
        </Switch>
      </main>
      <footer data-cy='footer-container' className='footer-container'>
        <p data-cy='footer' className='footer'> <a href='https://github.com/The-Readers-Collective'>The Reader's Collective</a></p>
      </footer>
    </div>
  )}
        }



export default App
