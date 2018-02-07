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
  getHtmlForBook = (html_url) =>
  {
    Adapter.getHtmlForBook(html_url).then(book => this.props.setBook(book))
  }
  render(){
    console.log(this.props)
    return(
      <div>
        <button onClick={() => {this.getHtmlForBook(this.props.book.html_url)}}>{this.props.book.title}</button>
        {this.state.showDetail && this.props.currentUser === null ?
          <div>
            <BookDetail collections={this.props.currentUser.user.collections} addBookToCollection={this.addBookToCollection} selectCollection={this.selectCollection} />
            <button onClick={() => this.setState({showDetail: !this.state.showDetail})}>^</button>
          </div>
          : null
        }
      </div>
    )
  }
}
export default BookCard
