import React from 'react'
import Adapter from './adapter'
import CollectionContainer from './CollectionContainer'
import { Grid, Image, Button, Segment, Container } from 'semantic-ui-react'


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


  render(){
    return(
      <Container>
        <Segment raised>
          <Button onClick={() => this.props.history.push('/search')}>Search</Button>
            {this.state.currentUser === null ? <h1>Loading</h1> :
                <div>
                  <h1>Hello, {this.state.currentUser.user.first_name}</h1>
                  <CollectionContainer collections={this.state.currentUser.user.collections} currentUser={this.state.currentUser} setBook={this.props.setBook}/>
                </div>
            }
        </Segment>
      </Container>

    )
  }
}

// <div style={{border:"1px solid black", margin:"5px"}} class="ui grid">
//   <div style={{border:"1px solid black", margin:"5px"}} class="three wide column">
export default Home;
