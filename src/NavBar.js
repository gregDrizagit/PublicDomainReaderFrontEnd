import React from 'react'
import { Image, Button, Segment, Header } from 'semantic-ui-react'
import logo from './images/logo.png'

  const NavBar = (props) =>
  {
    if(props.mountedBy === "search")
    {
      return(
        <Segment basic clearing>
          <Header as="a" floated="left">
            <Image as="a" onClick={() => props.history.push("/")} size="massive" src={logo} />
            <Header.Content color="olive">
              Public Domain Reader
            </Header.Content>
          </Header>
          <Header as="a" floated="right">
            <div>
              {props.user.user ? <h2>Welcome back, {props.user.user.first_name}</h2> : null}
              <Button circular onClick={() => props.history.push('/browse')} size="massive" icon="unhide" color="olive" />
              <Button circular onClick={() => props.history.push('/')} size="massive" icon="home" color="yellow" />
              <Button onClick={() => props.logout()}>Log Out</Button>

            </div>
          </Header>
        </Segment>
      )
    }else if(props.mountedBy === "browse")
    {
      return(
        <Segment basic clearing>
          <Header as="a" floated="left">
            <Image as="a" onClick={() => props.history.push("/")} size="massive" src={logo} />
            <Header.Content color="olive">
              Public Domain Reader
            </Header.Content>
          </Header>
          <Header as="a" floated="right">
            <div>
              {props.user.user ? <h2>Welcome back, {props.user.user.first_name}</h2> : null}
              <Button circular onClick={() => props.history.push('/search')} size="massive" icon="search" color="olive" />
              <Button circular onClick={() => props.history.push('/')} size="massive" icon="home" color="yellow" />
              <Button onClick={() => props.logout() }>Log Out</Button>

            </div>
          </Header>
        </Segment>
      )
    }else if(props.mountedBy === "home")
      return(
        <Segment basic clearing>
          <Header as="a" floated="left">
            <Image as="a" onClick={() => props.history.push("/")} size="massive" src={logo} />
            <Header.Content color="olive">
              Public Domain Reader
            </Header.Content>
          </Header>
          <Header as="a" floated="right">
            <div>
              {props.user.user ? <h2>Welcome back, {props.user.user.first_name}</h2> : null}
              <Button circular onClick={() => props.history.push('/browse')} size="massive" icon="unhide" color="olive" />
              <Button circular onClick={() => props.history.push('/search')} size="massive" icon="search" color="yellow" />

              <Button onClick={() => props.logout()}>Log Out</Button>

            </div>
          </Header>
        </Segment>
      )
  }

export default NavBar
