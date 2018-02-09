import React from 'react'
import Adapter from './adapter'
import { Grid, Image, Button, Segment, Container, Input, Icon } from 'semantic-ui-react'

class Login extends React.Component{

  constructor()
  {
    super()
    this.state = {
      errors:false,
      username: "",
      password: ""
    }
  }

  handleFormInput = (e) =>
  {
    console.log(e.target.user_name.value)
    e.preventDefault()

      Adapter.authorizeUser(e.target.user_name.value, e.target.password.value)
      .then(resp => resp.json())
      .then(user => {
          if(user.error)
          {
            this.setState({errors: true})
          }else
          {
            this.props.handleLogin(user)
            this.props.history.push('/')
          }
        }
      )
  }

    render(){
      return(
        <Container textAlign="center">
          <Segment color='olive'>

          {this.state.errors ? <h1>Login failed, please try again</h1>: null}
          <div className="login-form">
            <form onSubmit={this.handleFormInput}>
              <Input type="text" name="user_name" placeholder="Username" />
              <Input type="password" name="password" placeholder="Password" />
              <Button icon="sign in" type="submit" />
            </form>

          </div>
          <div className="signup-form">
              <form>
                <Input type="text" name="first_name" placeholder="First Name"/>
                <Input type="text" name="last_name" placeholder="Last Name"/>
                <Input type="text" name="username_name" placeholder="Password"/>
                <Input type="password" />
                <Button icon="sign in" type="submit"/>
              </form>
            </div>
          </Segment>
        </Container>
      )
  }
}
export default Login
