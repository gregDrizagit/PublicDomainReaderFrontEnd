import React from 'react'
import { Button, Card } from 'semantic-ui-react'

class SubjectCard extends React.Component
{
  //Like AuthorCard, all SubjectCard is is a collection of BookCards mostly
  //this can look a lot like AuthorCard

  render(){
    return(
      <Card color='olive'>
        <Card.Content>
          <Card.Header>
            {this.props.subject.name}
          </Card.Header>
          <Card.Description>
          </Card.Description>
        </Card.Content >
        <Card.Content extra>
          <Button icon="unhide" onClick={() => this.props.showCategory(this.props.subject.id, "subjects")} />
        </Card.Content>
      </Card>
    )
  }
}
export default SubjectCard
