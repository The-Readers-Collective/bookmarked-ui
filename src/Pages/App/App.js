import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import BrowseAllBooks from '../BrowseAllBooks/BrowseAllBooks'
import SingleBookView from '../SingleBookView/SingleBookView'
import AddBook from '../AddBook/AddBook'
import PageNotFound from '../PageNotFound/PageNotFound'

const App = () => {
  const pageName = "name"

  return (
    <div>
      <nav>
        <h1>Bookmarked</h1>
        <h2>tagline here</h2>
        <h3>{pageName}</h3>
      </nav>
      <main>
        <Switch>
          <Route path="/" render={() => 
            <Dashboard />
          }/>
          <Route path="/browse" render={() => 
            <BrowseAllBooks />
          }/>
          <Route path="/add" render={() =>
            <AddBook />
          }/>
          <Route path="/:ISBN" render={() => 
            <SingleBookView />
          }/>
          <Route path="*" render={() => 
            <PageNotFound />
          }/>
        </Switch>
      </main>
      <footer>
        <p>link to Reader's Collective</p>
      </footer>
    </div>

  )
}

export default App
