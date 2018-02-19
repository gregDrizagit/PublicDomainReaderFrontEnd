import React from 'react'
import BookCard from './BookCard'
import Adapter from './adapter'
import logo from './images/logo.png'

import { Grid, Image, Button, Icon, Segment, Loader, Card, Container, Header, Modal, Input, Menu } from 'semantic-ui-react'

class CategoryShow extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      category: props.category,
      author: null,
      bookshelf: null,
      subject: null
    }
  }

  componentDidMount()
  {
    Adapter.showCategory(this.props.id, this.props.category).then(resp => this.unpackResponse(resp))
  }

  showCategoryData = () =>
  {
    if(this.state.category === "authors")
    {
      const bookCards = this.state.author.books.map((book) => {return <BookCard currentUser={this.props.user} setBook={this.props.setBook} bookJson={book}/>})
      return (<div>
                <h1>{this.state.author.name}</h1>
                <h2>{this.state.author.birth_year} - {this.state.author.death_year}</h2>
                <h4>{this.state.author.books.length} books.</h4>
                <Card.Group itemsPerRow={4}>
                  {bookCards}
                </Card.Group>
              </div>)
    }else if(this.state.category === "subjects")
    {
      const bookCards = this.state.subject.books.map((book) => {return <BookCard key={book.id} currentUser={this.props.user} setBook={this.props.setBook} bookJson={book}/>})
      return (<div>
              <h1>{this.state.subject.name}</h1>
              <h4>{this.state.subject.books.length} books.</h4>
              <Card.Group itemsPerRow={4}>
                {bookCards}
              </Card.Group>
              </div>)
    }else if(this.state.category ==="bookshelves")
    {
      const bookCards = this.state.bookshelf.books.map((book) => {return <BookCard key={book.id} currentUser={this.props.user} setBook={this.props.setBook} bookJson={book}/>})
      return (<div>
              <h1>{this.state.bookshelf.name}</h1>
              <h4>{this.state.bookshelf.books.length} books.</h4>
              <Card.Group itemsPerRow={4}>
                {bookCards}
              </Card.Group>
              </div>)
    }
  }

  unpackResponse = (resp) =>
  {
    if(this.state.category === "authors")
    {
     this.setState({author: resp})
   }else if(this.state.category === "subjects")
   {
     this.setState({subject: resp})
   }else if(this.state.category === "bookshelves")
   {
     this.setState({bookshelf: resp})
   }
  }

  render(){
    return(
      <Container>
        <Segment>
        {
          this.state.author || this.state.subject || this.state.bookshelf ?
            this.showCategoryData()
          :
          <Segment textAlign="center">
            <Loader active inline size='large'>Fetching books...</Loader>
          </Segment>
        }
        </Segment>
      </Container>
    )
  }
}
export default CategoryShow
