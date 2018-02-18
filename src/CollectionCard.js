import React from 'react'
import { Grid, Image, Button, Icon, Segment, Card, Container, Input } from 'semantic-ui-react'
import BookCard from './BookCard'
class CollectionCard extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      showBooks: false
    }
  }
  componentDidMount()
  {
  }

  render(){
    const bookCards = this.props.collection.books.map((book) => {return <BookCard bookJson={book} mountedByCollectionColl={true} setBook={this.props.setBook} />})
    return(
      <Card style={{maxHeight:"500px", overflow: "scroll"}} color='olive'>
        <Card.Content>
          <Card.Header>
            {this.props.collection.name}
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
