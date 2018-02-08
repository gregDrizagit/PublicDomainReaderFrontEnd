import React from 'react'
import CollectionShow from './CollectionShow'
import CollectionCard from './CollectionCard'

import Adapter from './adapter'
import { Grid, Image, Button, Segment, Container, Input, Icon } from 'semantic-ui-react'

class CollectionContainer extends React.Component
{
    ///here we will render all our collections
    constructor()
    {
      super()
      this.state = {
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

  submitNewCollection = (e) =>
  {
    e.preventDefault()
    if(this.state.newCollectionName !== "")
    {
      if(this.userHasCollection(this.state.newCollectionName, this.props.collections))
      {
        alert("User Already has that collection")
      }else
      {
        Adapter.createNewCollection(this.state.newCollectionName, this.props.currentUser)
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
     const collections = this.props.collections.map((coll) => {return <CollectionCard collection={coll} setBook={this.props.setBook} showDetail={this.showCollectionDetail(coll)} />})

    return(
      <div>
      <Button icon="plus" onClick={() => {this.showNewCollectionForm()}} />

      {this.state.newCollectionForm ?
        <form onSubmit={this.submitNewCollection}>
          <Input type="text" value={this.state.newCollectionName} onChange={(e)=>this.setState({newCollectionName: e.target.value})} placeholder="New Collection Name" />
          <Button>Submit</Button>
        </form>
        : null}
      <h4>Your collections:</h4>
        <div className="ui link cards">
          {collections}
        </div>
        {this.state.showDetail ? <CollectionShow collection={this.state.selectedCollection} setBook={this.props.setBook} /> : null}
      </div>
    )
  }

}


export default CollectionContainer
