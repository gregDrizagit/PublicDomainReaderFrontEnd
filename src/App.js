import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter, Redirect} from 'react-router-dom'
import Adapter from './adapter'
import Login from './Login'
import Home from './Home'
import Read from './Read'
import Search from './Search'
import Nav from './Nav'
import Browse from './Browse'
import CategoryShow from './CategoryShow'

class App extends Component {

  constructor()
  {
    super()
    this.state = {
      auth:{
        currentUser: {}
      },
      currentlyReadingList: []
    }

  }

  componentDidMount()
  {
    const token = localStorage.getItem('token')
    const bookToken = localStorage.getItem("bookToken")
    const bookId = localStorage.getItem("bookId")
    const bookAuthor = localStorage.getItem("bookAuthor")
    const bookTitle = localStorage.getItem("bookTitle")
    let refreshMetaData = {bookId: bookId, bookAuthor: bookAuthor, bookTitle: bookTitle}
    if(token)
    {
     Adapter.getCurrentUser().then(user => {
        const currentUser = {currentUser: user}
        this.setState({auth: currentUser})
      })
    }
    if(bookToken && bookId)//if we have the book url and the book Id stored,
    {
      Adapter.getHtmlForBook(bookToken).then(book => {
        this.setState({bookHtml: book})

      })
      Adapter.getBookmarksForBook(bookId).then(bookmark => { //get any bookmarks

        if(bookmark.errors)
        {
          this.setState({currentlyReading: refreshMetaData})// if no bookmarks come back, set currently reading to hold the author, title, and ID
        }
        else
        { //if we do get a bookmark back, set the bookMetaData, as well as the paragrpah that comes back with the book.
          refreshMetaData.paragraph = bookmark.paragraph //add the bookmark to the bookMetaData object
          this.setState({currentlyReading: refreshMetaData})//set it as state
        }
      })

    }

    Adapter.getCurrentlyReadingForAllUsers().then(allUsers => this.setState({currentlyReadingList: allUsers}))
  }

  handleLogin = (user) =>
  {
    const currentUser = {currentUser: user}
    this.setState({auth: currentUser})
    localStorage.setItem('token', user.token)
  }

  addNewCollection = (newCollection) =>
  {
    const dummyUser = {...this.state.auth.currentUser}
    const updatedCollections = [...this.state.auth.currentUser.user.collections, newCollection]
    dummyUser.user.collections = updatedCollections
    const currentUser = {currentUser: dummyUser}
    this.setState({auth: currentUser})
  }


  deleteLocalCollection = (id) =>
  {
    debugger
    const newCollectionArray = this.state.auth.currentUser.user.collections.map((collection) => {
      if(collection.id !== id)
      {
        return collection
      }
      else
      {
        return null
      }
    }).filter((collection) => {
      return collection !== null
    })

    const dummyUser = {...this.state.auth.currentUser}
    dummyUser.user.collections = newCollectionArray
    const currentUser = {currentUser: dummyUser}
    this.setState({auth: currentUser})
  }

  handleLogout = () =>
  {
    this.setState({auth: {}})
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  // bookId, book, bookUrl, bookMeta
  setBook = (book) =>
  {
    localStorage.setItem("bookToken", book.htmlUrl)
    localStorage.setItem("bookId", book.bookId)
    localStorage.setItem("bookTitle", book.bookJson.title)
    localStorage.setItem("bookAuthor", book.bookJson.author.name)
    let bookMetaData = {bookId: book.bookId, bookAuthor: book.bookJson.author.name, bookTitle: book.bookJson.title}

    Adapter.getBookmarksForBook(book.bookId).then(bookmark => {
      if(bookmark.errors)
      {
        this.setState({currentlyReading: bookMetaData}, () => this.props.history.push('/read'))
      }
      else
      {
         bookMetaData.paragraph = bookmark.paragraph

        this.setState({bookHtml: book.bookHtml, currentlyReading: bookMetaData}, () => this.props.history.push('/read'))
      }
    })

  }

  render() {
    console.log(this.state)
    return (
      <div className="App">

        <Route exact path="/login" render={(routerProps) => {return <Login {...routerProps} handleLogin={this.handleLogin} />}}/>
        <Route exact path="/" render={(routerProps) => {return <Home {...routerProps} handleLogout={this.handleLogout} user={this.state.auth.currentUser} addNewCollection={this.addNewCollection} deleteLocalCollection={this.deleteLocalCollection} setBook={this.setBook} currentlyReading={this.state.currentlyReading} currentlyReadingList={this.state.currentlyReadingList} allBooks={this.state.books} logout={this.handleLogout}/> }}/>

        <Route exact path="/search" render={(routerProps)=>{return <Search {...routerProps} user={this.state.auth.currentUser} logout={this.handleLogout} setBook={this.setBook} /> }}/>
        <Route exact path="/read" render={(routerProps) => {return <Read {...routerProps} user={this.state.auth.currentUser} bookHtml={this.state.bookHtml} logout={this.handleLogout} currentlyReading={this.state.currentlyReading}/>}}/>

        <Route exact path="/browse" render={(routerProps) => {return <Browse {...routerProps} user={this.state.auth.currentUser} logout={this.handleLogout} setBook={this.setBook}/>}}/>

      </div>
    );
  }
}

export default withRouter(App);
