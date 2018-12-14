import React from 'react'
// import * as BooksAPI from './BooksAPI'
import MainView from './components/mainview'
import SearchView from './components/searchview'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  
// Two routes one for main view for viewing association and another for search view for finding books
  render() {
    return (
      <div> {/* "/" for main view and "/search" for search view */}
        <Route exact path="/" component={MainView} />
        <Route exact path="/search" component={SearchView} />
      </div>
    )
  }
}

export default BooksApp
