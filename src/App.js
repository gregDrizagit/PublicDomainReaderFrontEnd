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
        book: "",
        bookId: null,
        bookMeta: null,
        paragraph: null
      }
    }

  }

  componentDidMount()
  {
    const token = localStorage.getItem('token')
    const bookToken = localStorage.getItem("bookToken")
    const bookId = localStorage.getItem("bookId")
    const bookAuthor = localStorage.getItem("bookAuthor")
    const bookTitle = localStorage.getItem("bookTitle")
    if(token)
    {
       Adapter.getCurrentUser().then(user => {
         console.log(user)
          const currentUser = {currentUser: user}
          this.setState({auth: currentUser})
        })
    }

    if(bookToken && bookId)
    {
      Adapter.getHtmlForBook(bookToken).then(book => this.setState({book: book}))
      Adapter.getBookmarksForBook(bookId).then(bookmark => {
        if(bookmark.errors)
        {
          const bookMetaData = {bookId: bookId, bookAuthor: bookAuthor, bookTitle: bookTitle}
          this.setState({bookId: bookId, currentlyReading: bookMetaData})
        }
        else
        {
          const bookMetaData = {bookId: bookId, bookAuthor: bookAuthor, bookTitle: bookTitle}
          this.setState({bookId: bookId, currentlyReading: bookMetaData, paragraph: bookmark.paragraph})
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

  setBook = (bookId, book, bookUrl, bookMeta) =>
  {
    localStorage.setItem("bookToken", bookUrl)
    localStorage.setItem("bookId", bookId)
    localStorage.setItem("bookTitle", bookMeta.title)
    localStorage.setItem("bookAuthor", bookMeta.author.name)
    Adapter.getBookmarksForBook(bookId).then(bookmark => {
      if(bookmark.errors)
      {
        // alert("Click a paragraph to set bookmark")
        const bookMetaData = {bookId: bookId, bookAuthor: bookMeta.bookAuthor, bookTitle: bookMeta.bookTitle}

        this.setState({book: book, bookId: bookId, currentlyReading: bookMetaData}, () => this.props.history.push('/read'))
      }
      else
      {
        const bookMetaData = {bookId: bookId, bookAuthor: bookMeta.bookAuthor, bookTitle: bookMeta.bookTitle, paragraph: bookmark.paragraph}

        this.setState({book: book, currentlyReading: bookMetaData}, () => this.props.history.push('/read'))
      }
    })

  }

  render() {
    console.log("in app", this.state)
    return (
      <div className="App">

        <Route exact path="/login" render={(routerProps) => {return <Login {...routerProps} handleLogin={this.handleLogin} />}}/>
        <Route exact path="/" render={(routerProps) => {return <Home {...routerProps} handleLogout={this.handleLogout} user={this.state.auth.currentUser} setBook={this.setBook} currentlyReading={this.state.currentlyReading} allBooks={this.state.books}/> }}/>
        <Route exact path="/search" render={(routerProps)=>{return <Search {...routerProps} user={this.state.auth.currentUser} setBook={this.setBook} /> }}/>
        <Route exact path="/read" render={(routerProps) => {return <Read {...routerProps} user={this.state.auth.currentUser} bookId={this.state.bookId} paragraph={this.state.paragraph} book={this.state.book}/>}}/>
        <Route exact path="/browse" render={(routerProps) => {return <Browse {...routerProps} book={this.state.book} user={this.state.auth.currentUser} setBook={this.setBook}/>}}/>

      </div>
    );
  }
}

export default withRouter(App);
