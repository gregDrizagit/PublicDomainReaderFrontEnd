import React from 'react'
import CollectionShow from './CollectionShow'
import CollectionCard from './CollectionCard'

import Adapter from './adapter'
import { Grid, Image, Button, Segment, Container, Card, Input, Icon } from 'semantic-ui-react'

class CollectionContainer extends React.Component
{
    ///here we will render all our collections
    constructor(props)
    {
      super(props)
      this.state = {
        collections: props.collections,
        showDetail: false,
        newCollectionForm: false,
        newCollectionName: "",
        selectedCollection: null
      }
    }
  showCollectionDetail = (coll) =>
  {
    // this.setState({showDetail: !this.state.showDetail, selectedCollection: coll})
  }

  userHasCollection = (collectionName, collections) =>
  {
    const matchingCollections = collections.find((collection) => { return collection.name === collectionName})
    const hasCollection = matchingCollections ? true : false
    return hasCollection
  }
  deleteCollection = (id) =>
  {
     const newArray = this.state.collections.map((collection) => {
       if(collection.id !== id)
       {
         return collection
       }
       else
       {
         return null
       }
     }).filter((collection) => {
       return collection !== null
     })
     this.setState({collections: newArray})

    Adapter.deleteCollection(id)
  }

  submitNewCollection = (e) =>
  {
    e.preventDefault()
    if(this.state.newCollectionName !== "")
    {
      if(this.userHasCollection(this.state.newCollectionName, this.state.collections))
      {
        alert("User Already has that collection")
      }else
      {
        Adapter.createNewCollection(this.state.newCollectionName, this.props.currentUser).then(newCollection => {
            this.setState({collections: [...this.state.collections, newCollection]})
        })
      }
    }else
    {
      alert("Please enter a collection with a name.")
    }
  }

  showNewCollectionForm = () =>
  {
    this.setState({newCollectionForm: !this.state.newCollectionForm})
  }

  render()
  {
     const collections = this.state.collections.map((coll) => {return <CollectionCard collection={coll} setBook={this.props.setBook} deleteCollection={this.deleteCollection} showDetail={this.showCollectionDetail(coll)} /> })

    return(
      <div>
      <Button icon="plus" onClick={() => {this.showNewCollectionForm()}} />

      {this.state.newCollectionForm ?
        <form onSubmit={this.submitNewCollection}>
          <Input type="text" value={this.state.newCollectionName} onChange={(e)=> this.setState({newCollectionName: e.target.value})} placeholder="New Collection Name" />
          <Button>Add Collection</Button>
        </form>
        : null}
      <h4>Your collections:</h4>
          <Card.Group itemsPerRow={4}>
            {collections}
          </Card.Group>
        {this.state.showDetail ? <CollectionShow collection={this.state.selectedCollection} setBook={this.props.setBook} /> : null}
      </div>
    )
  }

}


export default CollectionContainer
