import React from 'react'
import BookCard from './BookCard'
import { Grid, Image, Button, Icon, Segment, Card, Container, Input, Menu } from 'semantic-ui-react'

class SubjectCard extends React.Component
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
      <Card color='teal'>
        <Card.Content>
          <Card.Header>
            {this.props.subject.name}
          </Card.Header>
          <Card.Description>
          </Card.Description>
        </Card.Content >
        <Card.Content extra>
        </Card.Content>
      </Card>
    )
  }
}
export default SubjectCard
