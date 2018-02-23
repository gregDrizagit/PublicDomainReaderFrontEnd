import React from 'react'
import BookCard from './BookCard'
import Adapter from './adapter'

import { Grid, Image, Button, Icon, Segment, Modal, Loader, Card, Container, Header, Input, Menu } from 'semantic-ui-react'

class CategoryModal extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      category: props.category,
      author: null,
      bookshelf: null,
      subject: null,
      isOpen: true
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
                <Modal.Header color="olive">

                  <Segment color="olive">
                    <Button icon="remove" onClick={() => this.setState({isOpen: !this.state.isOpen})}/>
                    <h1>
                     {this.state.author.name}
                    </h1>
                    <h2>
                      {this.state.author.birth_year} - {this.state.author.death_year}
                    </h2>
                    <h3>
                      {this.state.author.books.length} books.
                    </h3>
                  </Segment>
                </Modal.Header>
                <Modal.Content scrolling>
                  <Card.Group itemsPerRow={4}>
                    {bookCards}
                  </Card.Group>
                </Modal.Content>
              </div>)
    }else if(this.state.category === "subjects")
    {
      const bookCards = this.state.subject.books.map((book) => {return <BookCard key={book.id} currentUser={this.props.user} setBook={this.props.setBook} bookJson={book}/>})
      return (<div>
              <Segment raised>
                <Button icon="remove" onClick={() => this.setState({isOpen: !this.state.isOpen})}/>
                <h1>
                 {this.state.subject.name}
                </h1>
              </Segment>
              <Modal.Content scrolling>
                <Card.Group itemsPerRow={4}>
                  {bookCards}
                </Card.Group>
              </Modal.Content>
              </div>)
    }else if(this.state.category ==="bookshelves")
    {
      const bookCards = this.state.bookshelf.books.map((book) => {return <BookCard key={book.id} currentUser={this.props.user} setBook={this.props.setBook} bookJson={book}/>})
      return (<div>
                <Segment raised>
                  <Button icon="remove" onClick={() => this.setState({isOpen: !this.state.isOpen})}/>
                  <h1>
                   {this.state.bookshelf.name}
                  </h1>
                </Segment>
                <Modal.Content scrolling>
                  <Card.Group itemsPerRow={4}>
                    {bookCards}
                  </Card.Group>
                </Modal.Content>
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
          <Modal open={this.state.isOpen}>
            {this.state.author || this.state.subject || this.state.bookshelf ?
              this.showCategoryData()
            :
            <Segment>
              <Segment textAlign="center">
                <Loader active inline size='large'/>
              </Segment>
            </Segment>
            }
          </Modal>
        </Container>
      )
    }
}

export default CategoryModal
