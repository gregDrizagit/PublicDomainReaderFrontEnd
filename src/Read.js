import React from 'react'
import Adapter from './adapter'
import renderHTML from 'react-render-html';

class Read extends React.Component
{
  constructor(props)
  {
    console.log("in read")
    super(props)
    this.state = {
      book: props.book
    }
  }

  componentDidMount()
  {
    // this.setState({book: this.state.book.replace(/<p>/g, `<p id=12345 onClick={console.log("hello")}>`)})
    window.addEventListener('storage', function(e){ console.log("fjkadsf") })

    window.eval(this.injectJavascriptIntoBook(this.state.book))
  }
  watchStorage = () =>
  {
    console.log("change")
    debugger
  }

  setBookmark = () =>
  {
    Adapter.setBookmark(this.props.user.user.id, this.props.bookId, 5 )
  }


  danOdeaSpecial = (string, indexOfInjection, delCount, newSubStr) =>
  {
    return string.slice(0, indexOfInjection) + newSubStr + string.slice(indexOfInjection + Math.abs(delCount));
  };

  injectJavascriptIntoBook = (book) =>
  {
    const bookWithJavascript =
    `

    function setBookmark(e)
    {
      localStorage.setItem('bookMark', e.target.id)
    }
    const pTags = document.body.getElementsByTagName('p')
    Object.keys(pTags).forEach(key => {
      pTags[key].setAttribute("id", key)
      pTags[key].setAttribute("onclick","setBookmark(event)")
    })


    `
    return bookWithJavascript
  }

// this.danOdeaSpecial(book, book.indexOf("</body>"), 0, bookWithJavascript )
  createMarkup = () =>
  {
    return {__html: this.state.book};
  }



  render(){
    console.log(this.state)
    return(
      <div>
        <button onClick={() => this.props.history.push('/')}>Collections</button>
        <button onClick={() => this.props.history.push('/search')}>Search</button>
        <button onClick={() => this.setBookmark()}>Set Bookmark</button>

        {renderHTML(this.state.book)}
      </div>
    )
  }
}
export default Read
