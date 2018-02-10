import React from 'react'
import BookCard from './BookCard'
import AuthorCard from './AuthorCard'
import SubjectCard from './SubjectCard'
import { Grid, Image, Button, Icon, Segment, Card, Container, Input, Menu } from 'semantic-ui-react'
import InfiniteScroll from 'react-simple-infinite-scroll'


class BrowseContainer extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      activeTab: "Authors"
    }
  }


  componentDidMount()
  {
    this.props.handlePagination("Authors")
    this.props.handlePagination("Subjects")
    this.props.handlePagination("Books")
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeTab: name })
  }

  renderMenuContent = () => {
    switch(this.state.activeTab)
    {
      case "Subjects":
        return this.renderSubjectCards(this.props.subjects)
      case "Authors":
        return this.renderAuthorCards(this.props.authors)
      case "Books":
        return this.renderBookCards(this.props.books)
    }
  }


  renderAuthorCards = (authors) =>
  {
      const authorCards = authors.map((author) => <AuthorCard author={author} />)
      return authorCards
  }

  renderSubjectCards = (subjects) =>
  {
    const subjectCards = subjects.map((subject) => <SubjectCard subject={subject} />)
    return subjectCards
  }

  renderBookCards = (books) =>
  {
     const bookCards = books.map((book) => <BookCard book={book} currentUser={this.props.user} setBook={this.props.setBook} />)
     return bookCards
  }

  loadMore = () =>
  {
    console.log("load more")
  }


  render()
  {
    const { activeTab } = this.state
    console.log("container" ,this.props)
    return(
      <div>
        <Menu attached='top' tabular>
          <Menu.Item active={activeTab === 'Subjects'} name='Subjects' onClick={this.handleItemClick} />
          <Menu.Item active={activeTab === 'Authors'} name='Authors' onClick={this.handleItemClick} />
          <Menu.Item active={activeTab === 'Books'} name='Books' onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon={{ name: 'search', link: true }} placeholder={`Search ${this.state.activeTab}...`} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
          <Segment style={{maxHeight:"700px", overflow: "scroll"}} attached='Bottom'>
            <Card.Group itemsPerRow={4}>
              {this.renderMenuContent()}
            </Card.Group>
          </Segment><br/>
          <Button onClick={() => this.props.handlePagination(this.state.activeTab)}>Next Page</Button>
      </div>
    )
  }
}
export default BrowseContainer
