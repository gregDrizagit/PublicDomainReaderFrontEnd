import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter, Redirect} from 'react-router-dom'
import Adapter from './adapter'
import Login from './Login'
import Home from './Home'
import Read from './Read'
import Search from './Search'
import Nav from './Nav'
class App extends Component {

  constructor()
  {
    super()
    this.state = {
      auth:{
        currentUser: {}
      },
      book: ""
    }
  }

  componentDidMount()
  {
    const token = localStorage.getItem('token')
    if(token){
       Adapter.getCurrentUser().then(user => {
         console.log(user)
          const currentUser = {currentUser: user}
          this.setState({auth: currentUser})
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

  setBook = (book) =>
  {
    this.setState({book: book}, () => this.props.history.push('/read'))
  }

  render() {
    console.log("in app", this.state)
    return (
      <div className="App">
        <Route exact path="/login" render={(routerProps) => {return <Login {...routerProps} handleLogin={this.handleLogin} />}}/>
        <Route exact path="/" render={(routerProps) => {return <Home {...routerProps} handleLogout={this.handleLogout} user={this.state.auth.currentUser} setBook={this.setBook} allBooks={this.state.books}/> }}/>
        <Route exact path="/search" render={(routerProps)=>{return <Search {...routerProps} user={this.state.auth.currentUser} setBook={this.setBook} /> }}/>
        <Route exact path="/read" render={(routerProps) => <Read book={this.state.book}/>}/>
      </div>
    );
  }
}

export default withRouter(App);
