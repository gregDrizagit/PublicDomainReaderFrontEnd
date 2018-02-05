import React from 'react'
import Adapter from './adapter'

class Home extends React.Component{
  constructor()
  {
    super()
    this.state = {
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
    }else {
      this.props.history.push('/')
    }
  }


  render(){
    const loggedIn = !!this.props.user.first_name
    console.log(this.props)
      return(
      <div>
        <h1>Welcome home, {this.props.user.first_name}</h1>
        <button onClick={this.props.handleLogout}>{loggedIn ? <p>Log Out</p>:<p>Log In</p>} </button>
        <button onClick={() => this.props.history.push('/search')}>Search</button>
      </div>
    )
  }
}
export default Home
