import React from 'react'
import Adapter from './adapter'
import renderHTML from 'react-render-html';
import { Sidebar, Segment, Button, Menu, Image, Icon, Container, Header, Sticky } from 'semantic-ui-react'


class Read extends React.Component
{

  constructor(props)
  {
    super(props)
    this.state = {
      book: props.book,
      sidebar: false ,
      bookmark: null
    }

  }

  componentDidMount()
  {
    // this.setState({book: this.props.book}, console.log("in did mount", this.state))
    if(this.state.book)
    {
      const allPTags = this.injectJavascriptIntoBook()
      if(this.props.paragraph)
      {
        const paragraph = allPTags[this.props.paragraph]

        this.setState({bookmark: paragraph})
        paragraph.style.color = "red"
        paragraph.scrollIntoView()
      }
    }

  }

  runJavascriptOnHtml = (props) =>
  {

    const allPTags = this.injectJavascriptIntoBook()
    if(props.paragraph)
    {
      const paragraph = allPTags[props.paragraph]

      this.setState({bookmark: paragraph})
      paragraph.style.color = "red"
      paragraph.scrollIntoView()
    }

  }

  componentWillReceiveProps(nextProps)
  {
    console.log("RUNNING WILL MOUNT")
    if(nextProps.book === this.props.book)
    {

    }else {
      console.log("nextProps", nextProps)
      this.setState({book: nextProps.book}, () => this.runJavascriptOnHtml(nextProps))

    }
  }

  toggleVisibility = () =>
  {
    this.setState({sidebar: !this.state.sidebar})
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


  render(){
    if(this.state.book)
    {
      return(
        <div>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='push'
              width='thin'
              direction='left'
              visible={this.state.sidebar}
              icon='labeled'
              vertical
              inverted
            >
              <Menu.Item onClick={() => this.props.history.push('/')} name='home'>
                <Icon name='home' />
                Your Library
              </Menu.Item>
              <Menu.Item onClick={() => this.props.history.push('/browse')} name='gamepad'>
                <Icon name='gamepad' />
                Browse
              </Menu.Item>
              </Sidebar>
            <Sidebar.Pusher>

              <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
              {renderHTML(this.state.book)}

            </Sidebar.Pusher>

          </Sidebar.Pushable>

          </div>

      )

    }else
    {
      return(<h1>Loading</h1>)
    }
  }
}
export default Read
