import React from 'react'
import Adapter from './adapter'
import CollectionContainer from './CollectionContainer'
import NavBar from './NavBar'
import CurrentlyReadingContainer from './CurrentlyReadingContainer'
import {Segment, Loader, Container, Label } from 'semantic-ui-react'


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
          <NavBar mountedBy={"home"} user={this.state.currentUser} logout={this.props.logout} history={this.props.history}/>
          <Segment.Group>
          <Segment color="yellow" paded piled>
            {
              this.props.currentlyReading ?
              <Label as="a" onClick={() => this.props.history.push("/read")} raised ribbon color="olive">
                <h3>Continue reading "{this.props.currentlyReading.bookTitle}", by {this.props.currentlyReading.bookAuthor}</h3>
              </Label>
              :
              null
            }
            <CollectionContainer collections={this.state.currentUser.user.collections} addNewCollection={this.props.addNewCollection} deleteLocalCollection={this.props.deleteLocalCollection} currentUser={this.state.currentUser} setBook={this.props.setBook}/>
          </Segment>
          <Segment>
          <h3>What other people are reading:</h3>

            <CurrentlyReadingContainer setBook={this.props.setBook} currentlyReadingList={this.props.currentlyReadingList} />
          </Segment>
          </Segment.Group>
        </Container>
      )
    }else
    {
      return(<Container>
              <Segment>
                <Segment textAlign="center">
                  <Loader active inline size='large'/>
                </Segment>
              </Segment>
              </Container>)

    }
  }
}

// <div style={{border:"1px solid black", margin:"5px"}} class="ui grid">
//   <div style={{border:"1px solid black", margin:"5px"}} class="three wide column">
export default Home;
