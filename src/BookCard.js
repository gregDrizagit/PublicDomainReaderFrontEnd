import React from 'react'
import Adapter from './adapter'
import BookDetail from './BookDetail'
import {Card, Segment, Dropdown, Menu, Button ,Icon} from 'semantic-ui-react'
class BookCard extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      bookId: props.book.id,
      selectedCollection: null,
      mountedByCollectionColl: props.mountedByCollectionColl,
      showDetail: false
    }
  }

  addBookToCollection = () =>
  {
    if(this.isBookInCollection() === true)
    {
      alert(`That book is already contained in "${this.state.selectedCollection}"`)
    }
    else
    {
       Adapter.postBookToCollection(this.state.bookId, this.state.selectedCollection)
    }


  }
  selectCollection = (e, data) =>
  {
    console.log(data);
     this.setState({selectedCollection: data.value}, () => console.log("test state",this.state))

  }
  getHtmlForBook = (html_url) =>
  {
    Adapter.getHtmlForBook(html_url).then(book => this.props.setBook(book))
  }
  isBookInCollection = () =>
  {
    const collection = this.props.currentUser.user.collections.find((collection) => collection.name === this.state.selectedCollection)
    const book = collection.books.find((book) => book.id === this.state.bookId)
    const isInCollection = book ? true : false
    return isInCollection
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.book.title}
            </Card.Header>
            <Card.Description>
              by {this.props.book.author.name}
            </Card.Description>
          </Card.Content >
          <Card.Content extra>
            {this.state.mountedByCollectionColl === true ? <Button icon="leanpub" onClick={() => this.getHtmlForBook(this.props.book.html_url)} />
            :
            <div>
              Add to collection:
              <Segment>
                 <Dropdown value={this.state.selectedCollection} options={this.props.currentUser.user.collections.map((col)=> ({text: col.name, value: col.name}))}
                           onChange={this.selectCollection}
                 />
              </Segment>
              <Button icon="save" onClick={this.addBookToCollection} />
              <Button icon="leanpub" onClick={this.props.setBook} />
             </div>
            }
          </Card.Content>

        </Card>
      </div>
    )
  }
}
export default BookCard
