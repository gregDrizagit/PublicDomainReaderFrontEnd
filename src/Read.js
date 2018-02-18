import React from 'react'
import Adapter from './adapter'
import renderHTML from 'react-render-html';
import { Sidebar, Segment, Button, Menu, Image, Icon, Divider, Popup, Container, Header, Sticky, Loader } from 'semantic-ui-react'


class Read extends React.Component
{

  constructor(props)
  {
    super(props)
    this.state = {
      bookHtml: props.bookHtml,
      sidebar: false ,
      hideNav: false,
      negative: true,
      currentlyReading: props.currentlyReading,
      sizeIndex: 3,
      bookmark: null
    }

  }

  componentDidMount()
  {
    // this.setState({book: this.props.book}, console.log("in did mount", this.state))
    if(this.state.currentlyReading.bookHtml)
    {
      const allPTags = this.injectJavascriptIntoBook()
      if(this.props.currentlyReading.paragraph)
      {
        const paragraph = allPTags[this.props.currentlyReading.paragraph]

        this.setState({bookmark: paragraph})
        paragraph.style.color = "red"
        paragraph.scrollIntoView()
      }
    }

  }

  handleContextRef = contextRef => this.setState({ contextRef })

  runJavascriptOnHtml = (props) =>
  {

    const allPTags = this.injectJavascriptIntoBook(props.bookHtml)
    if(props.currentlyReading.paragraph)
    {
      const paragraph = allPTags[props.currentlyReading.paragraph]

      this.setState({bookmark: paragraph})
      paragraph.style.color = "red"
      paragraph.scrollIntoView()
    }

  }

  componentWillReceiveProps(nextProps)
  {

    console.log("RUNNING WILL MOUNT", nextProps)

    if(nextProps.bookHtml === this.props.bookHtml)
    {
    }else {
      console.log("read next props", nextProps)
      this.setState({bookHtml: nextProps.bookHtml, currentlyReading: nextProps.currentlyReading}, () => this.runJavascriptOnHtml(nextProps))
    }
  }

  toggleVisibility = () =>
  {
    this.setState({sidebar: !this.state.sidebar})
  }

  increaseFontSize = (adjustment) =>
  {
    const pTags = document.body.getElementsByTagName("p")
    const sizes = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"]
    if(adjustment === "increase")
    {
      if(this.state.sizeIndex < sizes.length)
      {
        this.setState({sizeIndex: this.state.sizeIndex += 1 })
        Array.from(pTags).forEach(tag => tag.style.fontSize = `${sizes[this.state.sizeIndex]}`)
      }
    }else if(adjustment === "decrease")
    {
      if(this.state.sizeIndex > 0)
      {
        this.setState({sizeIndex: this.state.sizeIndex -= 1 })

        Array.from(pTags).forEach(tag => tag.style.fontSize = `${sizes[this.state.sizeIndex]}`)
      }
    }
  }

  toggleNegative = () =>
  {
    if(this.state.negative)
    {
      document.body.style.backgroundColor = 'black'
      document.body.style.color = "orange"

    }
    else
    {
      document.body.style.backgroundColor = 'white'
      document.body.style.color = "black"
    }
    this.setState({negative: !this.state.negative})

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

  pushToRoute = (route) =>
  {
    if(!this.state.negative)
    {
      this.toggleNegative()
      this.props.history.push(route)
    }else
    {
      this.props.history.push(route)
    }
  }

  setBookmark = (pTag) =>
  {
    this.placeVisualBookmark(pTag)
    Adapter.setBookmark(this.props.user.user.id, this.props.currentlyReading.bookId, parseInt(this.state.bookmark.id))
  }


  danOdeaSpecial = (string, indexOfInjection, delCount, newSubStr) =>
  {
    return string.slice(0, indexOfInjection) + newSubStr + string.slice(indexOfInjection + Math.abs(delCount));
  };

  injectJavascriptIntoBook = (book) =>
  {
    const pTags = document.body.getElementsByTagName('p')
    document.body.style.backgroundColor = "white"

    Object.keys(pTags).forEach(key => {
      pTags[key].setAttribute("id", key)
      pTags[key].addEventListener("click", (e) => this.setBookmark(pTags[key]))
    })
    return pTags
  }


  render(){
    const {contextRef } = this.state
    console.log('read state render', this.state)
    if(this.state.bookHtml)
    {
      return(
        <div ref={this.handleContextRef}>
        <Sticky context={contextRef}>
          <Button circular basic onClick={() => this.setState({hideNav: !this.state.hideNav})} size="massive" icon="bars" />
          {
            this.state.hideNav ?
            <div>
                <Button circular onClick={() => this.pushToRoute('/')} size="massive" icon="home" color="olive" />
                <Button circular onClick={() => this.pushToRoute('/browse')} size="massive" icon="unhide" color="yellow" />
                <Button circular onClick={() => this.pushToRoute('/search')} size="massive" icon="search" color="olive" />
                <Button circular onClick={() => this.toggleNegative() } size="large" icon="lightbulb" color="blue" />
                <Button circular onClick={() => {this.increaseFontSize("increase")}} size="large" icon="plus" color="red" />
                <Button circular onClick={() => {this.increaseFontSize("decrease")}} size="large" icon="minus" color="red" />
            </div>
            :
            null
          }
        </Sticky>
        {renderHTML(this.state.bookHtml)}
        </div>
      )

    }else
    {
      return(
          <Segment>
            <Segment textAlign="center">
              <Loader active inline size='large'>Fetching book...</Loader>
            </Segment>
          </Segment>
          )
    }
  }
}
export default Read
