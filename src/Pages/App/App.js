import React from 'react'
import { useState } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import BrowseAllBooks from '../BrowseAllBooks/BrowseAllBooks'
import SingleBookView from '../SingleBookView/SingleBookView'
import AddBook from '../AddBook/AddBook'
import PageNotFound from '../PageNotFound/PageNotFound'
import logo from '../../Images/bm_logo.svg'
import './App.css'

const App = () => {
  let location = useLocation()
  let pageName;
  const [ userId, setUserId ] = useState(0)
  const homeLink = location.pathname !== "/" && <Link data-cy="return-home-text" to="/">Return Home</Link>
  const browseLink = location.pathname !== "/browse" && location.pathname !== "/" && <Link data-cy="browse-text" to="/browse">Browse</Link>

  if (location.pathname === "/") {
    pageName = "My Bookshelf"
  } else if (location.pathname === "/browse") {
    pageName = "Browse All Books"
  } else if (location.pathname === "/add") {
    pageName = "Add a Book"
  } 

  return (
    <div>
      <nav data-cy='nav-bar' className='nav-bar'>
        <div className='app-info'>
          <img data-cy='logo-image' className='logo-image' src={logo} alt='logo design' />
          <div data-cy='app-info-container' className='app-info-container'>
            {/* <div data-cy='app-name' className='app-name-tagline'>
              <h1 data-cy='app-title'>Bookmarked</h1>
              <h2 data-cy='app-tagline'>Where Book Lovers Gather</h2>
            </div> */}
            <h3 data-cy='page-name' className='page-name'>{pageName}</h3>
          </div>
        </div>
        <div data-cy='nav-links' className='nav-links'>
          <h3 data-cy='home-btn'>{homeLink}</h3>
          <h3 data-cy='browse-btn'>{browseLink}</h3>
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" render={() => 
            <Dashboard 
              setUserId={setUserId}
            />
          }/>
          <Route path="/browse" render={() => 
            <BrowseAllBooks userId={userId} />
          }/>
          <Route path="/add" render={() =>
            <AddBook 
              userId={userId}
            />
          }/>
          <Route exact path="/:id" render={({match}) => 
            <SingleBookView id={match.params.id} userId={userId} />
          }/>
          <Route path="*" render={() => 
            <PageNotFound />
          }/>
        </Switch>
      </main>
      <footer data-cy='footer-container' className='footer-container'>
        <p data-cy='footer' className='footer'> <a href="https://github.com/The-Readers-Collective">The Reader's Collective</a></p>
      </footer>
    </div>
  )
}

export default App
