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
      book: props.book,
      bookmark: null
    }
  }

  componentDidMount()
  {
    // this.setState({book: this.state.book.replace(/<p>/g, `<p id=12345 onClick={console.log("hello")}>`)})
    window.addEventListener('storage', function(e){ console.log("fjkadsf") })
    // window.eval(this.injectJavascriptIntoBook(this.state.book))
    const allPTags = this.injectJavascriptIntoBook()
    

    if(this.props.paragraph)
    {
      const paragraph = allPTags[this.props.paragraph]
      this.setState({bookmark: paragraph})
      paragraph.style.color = "red"
      paragraph.scrollIntoView()
    }
  }
  watchStorage = () =>
  {
    console.log("change")
    debugger
  }

  placeVisualBookmark = (pTag) =>
  {
    if(this.state.bookmark)
    {
      if(pTag.id === this.state.bookmark.id)
      {

      }
      else
      {
        this.state.bookmark.style.color = "black"
        pTag.style.color = "red"
        this.setState({bookmark: pTag})
      }
    }else
    {
      pTag.style.color = "red"
      this.setState({bookmark: pTag})
    }
  }

  setBookmark = (pTag) =>
  {
    this.placeVisualBookmark(pTag)
    Adapter.setBookmark(this.props.user.user.id, this.props.bookId, parseInt(this.state.bookmark.id))
    // const bookmarkThis = document.getElementById(this.state.bookmark.id)
  }


  danOdeaSpecial = (string, indexOfInjection, delCount, newSubStr) =>
  {
    return string.slice(0, indexOfInjection) + newSubStr + string.slice(indexOfInjection + Math.abs(delCount));
  };

  injectJavascriptIntoBook = (book) =>
  {
    const pTags = document.body.getElementsByTagName('p')
    Object.keys(pTags).forEach(key => {
      pTags[key].setAttribute("id", key)
      pTags[key].addEventListener("click", (e) => this.setBookmark(pTags[key]))
    })
    return pTags
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
