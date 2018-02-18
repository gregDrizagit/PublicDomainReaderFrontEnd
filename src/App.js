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
      currentlyReading:{

      }
    }

  }

  componentDidMount()
  {
    console.log("did mount")
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
  }

  handleLogin = (user) =>
  {
    const currentUser = {currentUser: user}
    this.setState({auth: currentUser})
    localStorage.setItem('token', user.token)
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
    return (
      <div className="App">

        <Route exact path="/login" render={(routerProps) => {return <Login {...routerProps} handleLogin={this.handleLogin} />}}/>
        <Route exact path="/" render={(routerProps) => {return <Home {...routerProps} handleLogout={this.handleLogout} user={this.state.auth.currentUser} setBook={this.setBook} currentlyReading={this.state.currentlyReading} allBooks={this.state.books}/> }}/>

        <Route exact path="/search" render={(routerProps)=>{return <Search {...routerProps} user={this.state.auth.currentUser} setBook={this.setBook} /> }}/>
        <Route exact path="/read" render={(routerProps) => {return <Read {...routerProps} user={this.state.auth.currentUser} bookHtml={this.state.bookHtml} currentlyReading={this.state.currentlyReading}/>}}/>

        <Route exact path="/browse" render={(routerProps) => {return <Browse {...routerProps} user={this.state.auth.currentUser} setBook={this.setBook}/>}}/>

      </div>
    );
  }
}

export default withRouter(App);
