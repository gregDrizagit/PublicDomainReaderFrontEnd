import React from 'react'
import Adapter from './adapter'
import CollectionContainer from './CollectionContainer'
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
      <div>
        <button onClick={() => this.props.history.push('/search')}>Search</button>
        {this.state.currentUser === null ? <h1>Loading</h1> :
          <div>
            <h1>Hello, {this.state.currentUser.user.first_name}</h1>
            <CollectionContainer collections={this.state.currentUser.user.collections} setBook={this.props.setBook}/>
          </div>
        }
      </div>
    )
  }
}
export default Home
