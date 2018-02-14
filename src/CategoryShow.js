import React from 'react'
import BookCard from './BookCard'
import Adapter from './adapter'
import { Grid, Image, Button, Icon, Segment, Card, Container, Input, Menu } from 'semantic-ui-react'

class CategoryShow extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      category: props.category,
      author: null,
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
      const bookCards = this.state.author.books.map((book) => {return <BookCard currentUser={this.props.user} setBook={this.props.setBook} book={book}/>})
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
      const bookCards = this.state.subject.books.map((book) => {return <BookCard key={book.id} currentUser={this.props.user} setBook={this.props.setBook} book={book}/>})
      return (<div>
              <h1>{this.state.subject.name}</h1>
              <h4>{this.state.subject.books.length} books.</h4>
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
   }else
   {
     this.setState({subject: resp})
   }
  }

  render(){
    return(
      <Container>
        <Segment>
        {
          this.state.author || this.state.subject ?
            this.showCategoryData()
          :
          <h1>Loading...</h1>
        }
        </Segment>
      </Container>
    )
  }
}
export default CategoryShow
