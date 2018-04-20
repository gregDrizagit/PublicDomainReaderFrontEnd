import React from 'react'
import { Button, Card } from 'semantic-ui-react'

class BookshelfCard extends React.Component
{
  //Like AuthorCard, all SubjectCard is is a collection of BookCards mostly
  //this can look a lot like AuthorCard
  constructor()
  {
    super()
    this.state = {

    }
  }
  render(){
    return(
      <Card color='yellow'>
        <Card.Content>
          <Card.Header>
            {this.props.bookshelf.name}
          </Card.Header>
          <Card.Description>
          </Card.Description>
        </Card.Content >
        <Card.Content extra>
          <Button icon="unhide" onClick={() => this.props.showCategory(this.props.bookshelf.id, "bookshelves")} />
        </Card.Content>
      </Card>
    )
  }
}
export default BookshelfCard
