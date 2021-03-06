import React from 'react'
import BookCard from './BookCard'
import AuthorCard from './AuthorCard'
import SubjectCard from './SubjectCard'
import BookshelfCard from './BookshelfCard'
import { Button, Segment, Card, Menu, } from 'semantic-ui-react'


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
    this.props.handlePagination("Bookshelves")
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
      case "Bookshelves":
        return this.renderBookshelfCards(this.props.bookshelves)
    }
  }


  renderAuthorCards = (authors) =>
  {
    const authorCards = authors.map((author) => <AuthorCard showCategory={this.props.showCategory} author={author} />)
    return authorCards
  }

  renderSubjectCards = (subjects) =>
  {
    const subjectCards = subjects.map((subject) => <SubjectCard showCategory={this.props.showCategory} subject={subject} />)
    return subjectCards
  }

  renderBookCards = (books) =>
  {
     const bookCards = books.map((book) => <BookCard bookJson={book} currentUser={this.props.user} setBook={this.props.setBook} />)
     return bookCards
  }
  renderBookshelfCards = (bookshelves) =>
  {
     const bookshelfCards = bookshelves.map((bookshelf) => <BookshelfCard bookshelf={bookshelf} showCategory={this.props.showCategory} currentUser={this.props.user} setBook={this.props.setBook} />)
     return bookshelfCards
  }


  render()
  {
    const { activeTab } = this.state
    return(
      <div>
        <Menu attached='top' tabular>
          <Menu.Item active={activeTab === 'Subjects'} name='Subjects' onClick={this.handleItemClick} />
          <Menu.Item active={activeTab === 'Authors'} name='Authors' onClick={this.handleItemClick} />
          <Menu.Item active={activeTab === 'Books'} name='Books' onClick={this.handleItemClick} />
          <Menu.Item active={activeTab === 'Bookshelves'} name='Bookshelves' onClick={this.handleItemClick} />

          <Menu.Menu position='right'>

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
