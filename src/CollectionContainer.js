import React from 'react'
import CollectionShow from './CollectionShow'
class CollectionContainer extends React.Component
{
    ///here we will render all our collections
    constructor()
    {
      super()
      this.state = {
        showDetail: false,
        selectedCollection: null
      }
    }
  showCollectionDetail = (coll) =>
  {
    this.setState({showDetail: !this.state.showDetail, selectedCollection: coll})
  }


  render()
  {
    const collections = this.props.collections.map((coll) => {return <li>{coll.name} <button onClick={()=>this.showCollectionDetail(coll)}></button></li> })

    return(
      <div>
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
