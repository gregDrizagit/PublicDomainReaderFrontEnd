import React from 'react'
import CollectionShow from './CollectionShow'
import Adapter from './adapter'
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
    this.setState({showDetail: !this.state.showDetail, selectedCollection: coll})
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
    const collections = this.props.collections.map((coll) => {return <li>{coll.name} <button onClick={()=>this.showCollectionDetail(coll)}></button></li> })

    return(
      <div>
      <button onClick={() => {this.showNewCollectionForm()}}>New Collection</button>
      {this.state.newCollectionForm ?
        <form onSubmit={this.submitNewCollection}>
          <input type="text" value={this.state.newCollectionName} onChange={(e)=>this.setState({newCollectionName: e.target.value})} placeholder="New Collection Name"></input>
          <button>Submit</button>
        </form>
        : null}
      <h4>Your collections:</h4>
        <ul>
          {collections}
        </ul>
        {this.state.showDetail ? <CollectionShow collection={this.state.selectedCollection} setBook={this.props.setBook} /> : null}
      </div>
    )
  }

}


export default CollectionContainer
