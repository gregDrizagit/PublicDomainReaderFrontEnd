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
            <form onSubmit={this.handleFormInput}>
              <Input type="text" name="user_name" placeholder="Username" />
              <Input type="password" name="password" placeholder="Password" />
            <Button icon="sign in" type="submit" />
            </form>

          </div>

        </Segment>
      </div>
      )
  }
}
export default Login
