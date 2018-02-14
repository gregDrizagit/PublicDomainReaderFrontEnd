import React from 'react'
import Adapter from './adapter'
import BookDetail from './BookDetail'
import {Card, Segment, Dropdown, Menu, Button ,Icon, Image, Label, Loader} from 'semantic-ui-react'
import cover1 from './images/cover-1.jpg'
import cover2 from './images/cover-2.jpg'
import cover3 from './images/cover-3.jpg'
import cover4 from './images/cover-4.jpg'
import cover5 from './images/cover-5.jpg'




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
  modifyImgUrl = (img_url) =>
  {
    if(img_url !== "No Image")
    {
      return img_url.replace(/small/i, 'medium');
    }else
    {
      const covers = [cover1, cover2, cover3, cover4, cover5]
      return covers[Math.floor(Math.random() * Math.floor(covers.length))]
    }
    // require(`/assets/images/cover-${Math.floor(Math.random() * Math.floor(5) + 1)}.jpg`)

  }

  selectCollection = (e, data) =>
  {
     this.setState({selectedCollection: data.value})

  }
  getHtmlForBook = (html_url) =>
  {
    Adapter.getHtmlForBook(html_url).then(book => this.props.setBook(this.state.bookId, book, html_url, this.props.book))
  }
  isBookInCollection = () =>
  {
    const collection = this.props.currentUser.user.collections.find((collection) => collection.name === this.state.selectedCollection)
    const book = collection.books.find((book) => book.id === this.state.bookId)
    const isInCollection = book ? true : false
    return isInCollection
  }

  render(){

    return(
        <Card color='yellow'>
            <Image centered size="small" src={this.modifyImgUrl(this.props.book.img_url)} />
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
              <Segment card color="olive">
                 <Dropdown value={this.state.selectedCollection} options={this.props.currentUser.user.collections.map((col)=> ({text: col.name, value: col.name}))}
                           onChange={this.selectCollection}
                 />
              </Segment>
              <Button icon="save" onClick={this.addBookToCollection} />
              <Button icon="leanpub" onClick={() => this.getHtmlForBook(this.props.book.html_url)} />
             </div>
            }
          </Card.Content>

        </Card>
    )
  }
}
export default BookCard
