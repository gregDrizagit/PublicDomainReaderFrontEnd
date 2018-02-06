import React from 'react'
import Adapter from './adapter'
import BookDetail from './BookDetail'

class BookCard extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      bookId: props.book.id,
      selectedCollection: null,
      showDetail: false
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
    console.log(this.state.selectedCollection)
    return(
      <div>
        <p>{<a key={this.props.book.id} href={this.props.book.html_url}> {this.props.book.title}</a>}</p>
        <button onClick={() => this.setState({showDetail: !this.state.showDetail})}>^</button>
        {this.state.showDetail ? <BookDetail collections={this.props.currentUser.user.collections} addBookToCollection={this.addBookToCollection} selectCollection={this.selectCollection} />: null}
      </div>
    )
  }
}
export default BookCard
