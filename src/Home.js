import React from 'react'
import Adapter from './adapter'
import CollectionContainer from './CollectionContainer'
import { Grid, Image, Button, Segment, Sidebar, Icon, Container, Menu } from 'semantic-ui-react'


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
    return(
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='push'
          width='thin'
          direction='top'
          visible={this.state.sidebar}
          icon='labeled'
          horizontal
          inverted
        >
          <Menu.Item onClick={() => this.props.history.push('/browse')} name='gamepad'>
            <Icon name='gamepad' />
            Browse
          </Menu.Item>
          </Sidebar>
        <Sidebar.Pusher>
        <Button circular size="massive" icon="bars" onClick={this.toggleVisibility}/>

        <Container>
              {this.state.currentUser === null ? <h1>Loading</h1> :
                  <div>
                    <h1>Welcome back, {this.state.currentUser.user.first_name}.</h1>
                    <h2>Browse, collect, and read all 60,000+ books in the public domain.</h2>
                    <CollectionContainer collections={this.state.currentUser.user.collections} currentUser={this.state.currentUser} setBook={this.props.setBook}/>
                  </div>
              }
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>

    )
  }
}

// <div style={{border:"1px solid black", margin:"5px"}} class="ui grid">
//   <div style={{border:"1px solid black", margin:"5px"}} class="three wide column">
export default Home;
