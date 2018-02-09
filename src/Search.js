import React from 'react'
import Adapter from './adapter'
import BookCard from './BookCard'
import { Grid, Image, Button, Segment, Input, Container, Icon, Card, Loader, Dimmer } from 'semantic-ui-react'


class Search extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      allBooks:[],
      filteredBooks: [],
      errors: null,
      query:"",
      currentUser: props.user
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

  handleInputChange = (e) =>
  {
    // const searchedBooks = this.state.allBooks.filter((book) => {return book.title.includes(e.target.value)})
    this.setState({query: e.target.value})
  }
  searchBooks = (e) =>
  {
    e.preventDefault()
    if(this.state.query !== "")
    {
      Adapter.searchBooks(this.state.query).then(books => {
        if(books.length > 0)
        {
          this.setState({filteredBooks: books})

        }else
        {
          alert(`We didn't find anything for ${this.state.query}`)
        }
      })
    }else
    {
      alert("Please enter a search query")
    }
  }


  render(){
    const bookCards = this.state.filteredBooks.map((book)=>{return <BookCard book={book} setBook={this.props.setBook} currentUser={this.state.currentUser} />})
    return(
      <Container>
          <Segment color="olive">
          <form onSubmit={this.searchBooks}>
            <Input fluid size="huge" type="text" value={this.state.query} name="search" placeholder="Search for book" onChange={this.handleInputChange} />
            <Button icon="search" type="submit" />
          </form>
          </Segment >
            <Card.Group centered itemsPerRow={4}>
              {this.state.filteredBooks.length > 0 ? bookCards : <Segment><Dimmer><Loader >We need to get the books</Loader></Dimmer></Segment>}
            </Card.Group>
      </Container>
    )
  }
}

export default Search
