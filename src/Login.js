import React from 'react'
import Adapter from './adapter'
import logo from './images/logo.png'

import { Grid, Image, Button, Segment, Container, Header, Input, Icon } from 'semantic-ui-react'

class Login extends React.Component{

  constructor()
  {
    super()
    this.state = {
      errors:false,
      username: "jadderley",
      password: "123"
    }
  }

  componentDidMount()
  {
    this.submitUser()
  }

  submitUser = () =>
  {
    // e.preventDefault()
      Adapter.authorizeUser(this.state.username, this.state.password)
      .then(resp => resp.json())
      .then(user => {
        console.log(user)
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
      <div>
        <Container textAlign="left">
          <Header>
            <Image size="massive" src={logo} />
            <Header.Content>
              Public Domain Reader
            </Header.Content>
          </Header>
        </Container>


          <Segment vertical textAlign={"center"} color='olive'>
          {this.state.errors ? <h1>Login failed, please try again</h1>: null}
          <div className="login-form">
            <form onSubmit={this.submitUser}>
              <Input type="text" value={this.state.username} name="user_name" placeholder="Username" />
              <Input type="password" value={this.state.password} name="password" placeholder="Password" />
            <Button icon="sign in" type="submit" />
            </form>

          </div>

        </Segment>
      </div>
      )
  }
}
export default Login
