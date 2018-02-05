import React from 'react'
import Adapter from './adapter'

class Login extends React.Component{

  constructor()
  {
    super()
    this.state = {
      errors:false
    }
  }

  handleFormInput = (e) =>
  {
    e.preventDefault()
    Adapter.authorizeUser(e.target.user_name.value, e.target.password.value)
    .then(resp => resp.json())
    .then(user => {
        if(user.error)
        {
          this.setState({errors: true})
        }else{
          console.log("our user is:", user)
          this.props.handleLogin(user)
          this.props.history.push('/')
        }
      }
    )

  }

    render(){
      console.log(this.state)
      return(
        <div>
          {this.state.errors ? <h1>Login failed, please try again</h1>: null}
          <div className="login-form">
            <form onSubmit={this.handleFormInput}>
              <input type="text" name="user_name" placeholder="Username" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit">Log In</button>
            </form>

          </div>
          <div className="signup-form">
            <form>
              <input type="text" name="first_name" placeholder="First Name"/>
              <input type="text" name="last_name" placeholder="Last Name"/>
              <input type="text" name="username_name" placeholder="Password"/>
              <input type="password" />
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>
      )
  }
}
export default Login
