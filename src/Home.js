import React from 'react'
import Adapter from './adapter'
import CollectionContainer from './CollectionContainer'
import logo from './images/logo.png'

import { Grid, Image, Button, Segment, Header, Sidebar, Divider, Icon, Container, Menu, Label } from 'semantic-ui-react'


class Home extends React.Component{
  constructor()
  {
    super()
    this.state = {
        currentUser: null

    }
  }

  componentDidMount()
  {
    const token = localStorage.getItem('token')
    if(token){
       Adapter.getCurrentUser().then(user => {
          this.setState({currentUser: user})
        })
    }else {
      this.props.history.push('/login')
    }
  }

  toggleVisibility = () =>
  {
    this.setState({sidebar: !this.state.sidebar})
  }


  render(){
    if(this.state.currentUser)
    {
      return(
        <Container>
          <Header>
            <Image size="massive" src={logo} />
            <Header.Content>
              Public Domain Reader
            </Header.Content>
          </Header>


          <Segment>
            {this.props.currentlyReading ?
              <Label as="a" onClick={() => this.props.history.push("/read")} raised ribbon color="olive">
              <h3>Continue reading "{this.props.currentlyReading.bookTitle}", by {this.props.currentlyReading.bookAuthor}</h3>
              </Label>
              :
              null
            }

              <CollectionContainer collections={this.state.currentUser.user.collections} currentUser={this.state.currentUser} setBook={this.props.setBook}/>
          </Segment>
        </Container>
      )
    }else
    {
      return(<h1>Loading...</h1>)

    }
  }
}

// <div style={{border:"1px solid black", margin:"5px"}} class="ui grid">
//   <div style={{border:"1px solid black", margin:"5px"}} class="three wide column">
export default Home;
