import React from 'react'
// import { useState, useEffect } from 'react'
// import { useQuery, gql } from '@apollo/client'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import BrowseAllBooks from '../BrowseAllBooks/BrowseAllBooks'
import SingleBookView from '../SingleBookView/SingleBookView'
import AddBook from '../AddBook/AddBook'
import PageNotFound from '../PageNotFound/PageNotFound'

const App = () => {
  let location = useLocation()
  const homeLink = location.pathname !== "/" && <Link to="/">Return Home</Link>
  let pageName;

  if (location.pathname === "/") {
    pageName = "My Bookshelf"
  } else if (location.pathname === "/browse") {
    pageName = "Browse All Books"
  } else if (location.pathname === "/add") {
    pageName = "Add a Book"
  } else if (location.pathname === "/single") {
    //change path to :id
    pageName = "Book View"
  } else {
    pageName = "oops"
  }
  //Once we have single book view working, test that lines 21 and 22 are functional

  return (
    <div>
      <nav>
        <h1>Bookmarked</h1>
        <h2>tagline here</h2>
        <h3>{pageName}</h3>
        <h3>{homeLink}</h3>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" render={() => 
            <Dashboard />
          }/>
          <Route path="/browse" render={() => 
            <BrowseAllBooks />
          }/>
          <Route path="/add" render={() =>
            <AddBook />
          }/>
          <Route path="/single" render={() => 
          //change path back to :id
            <SingleBookView />
          }/>
          <Route path="*" render={() => 
            <PageNotFound />
          }/>
        </Switch>
      </main>
      <footer>
        <p>Visit us at <a href="https://github.com/The-Readers-Collective">The Reader's Collective</a></p>
      </footer>
    </div>

  )
}

export default App
