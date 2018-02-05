import React from 'react'
import Adapter from './adapter'

class BookCard extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      bookId: props.book.id,
      selectedCollection: props.collections[0]
    }
  }

  addBookToCollection = () =>
  {
    Adapter.postBookToCollection(this.state.bookId, this.state.selectedCollection)
  }
  selectCollection = (e) =>
  {
    this.setState({selectedCollection: e.target.selectedOptions[0].value})
  }
  render(){
    console.log(this.props.book)
    const collections = this.props.collections.map((coll) => {return <option name={coll.name} key={coll.id}>{coll.name}</option>})
    return(
      <div>
        <p>{<a key={this.props.book.id} href={this.props.book.html_url}> {this.props.book.title}</a>}</p>

        {this.state.selectedCollection === null ? <p>Select collection</p> : <button onClick={this.addBookToCollection}>Add to Collection</button> }

        <select onSelect={this.selectCollection} >
          {collections}
        </select>
      </div>
    )
  }
}
export default BookCard
