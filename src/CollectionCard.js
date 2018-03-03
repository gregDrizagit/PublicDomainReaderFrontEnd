import React from 'react'
import { Grid, Image, Button, Icon, Segment, Card, Container, Input, Label } from 'semantic-ui-react'
import BookCard from './BookCard'
import Adapter from './adapter'
class CollectionCard extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      showBooks: false
    }
  }

  render(){
    const bookCards = this.props.collection.books.map((book) => {return <BookCard bookJson={book} mountedByCollectionColl={true} setBook={this.props.setBook} />})
    return(
      <Card style={{maxHeight:"500px", overflow: "scroll"}} color='olive'>
        <Card.Content>
          <Card.Header>
            {this.props.collection.name}
            <Button basic circular floated="right" size="tiny" icon="delete" onClick={() => this.props.deleteCollection(this.props.collection.id) }/>
          </Card.Header>
          <Card.Description>
            {this.state.showBooks ? bookCards : null}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button icon="unhide" onClick={() => this.setState({showBooks: !this.state.showBooks})} />

        </Card.Content>
      </Card>
    )
  }


}
export default CollectionCard
