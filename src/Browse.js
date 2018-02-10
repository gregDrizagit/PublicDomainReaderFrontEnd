import React from 'react'
import Adapter from './adapter'
import BookCard from './BookCard'
import AuthorCard from './AuthorCard'
import SubjectCard from './SubjectCard'
import BrowseContainer from './BrowseContainer'
import InfiniteScroll from 'react-infinite-scroll-component';

import { Grid, Image, Button, Icon, Segment, Card, Container, Input, Menu } from 'semantic-ui-react'

class Browse extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      subjectsPage: 1,
      subjects: [],
      subjectCards: [],

      authorsPage:1,
      authors: [],
      authorCards: [],

      booksPage:1,
      books: [],
      bookCards: [],

      results:20,
      route:""
    }
  }

  getPages = (route) =>
  {
    switch(route)
    {
      case "Books":
        console.log("went in here")
        Adapter.getPage(this.state.booksPage, this.state.results, "book_list").then(books => {
            const joinedBooks = this.state.books.concat(books)
            this.setState({books: joinedBooks, booksPage: this.state.booksPage += 1})
          })
        break;
      case "Authors":
        Adapter.getPage(this.state.authorsPage, this.state.results, "author_list").then(authors => {
          const joinedAuthors = this.state.authors.concat(authors)
          this.setState({authors: joinedAuthors, authorsPage: this.state.authorsPage += 1})
        })
        break;
      case "Subjects":
        Adapter.getPage(this.state.subjectsPage, this.state.results, "subject_list").then(subjects => {
          const joinedSubject = this.state.subjects.concat(subjects)
          this.setState({subjects: joinedSubject, subjectsPage: this.state.subjectsPage += 1})
        })
        break;
    }
  }

  componentDidMount()
  {
     this.getPages("book_list")
     this.getPages("author_list")
     this.getPages("subject_list")
  }

  handleRadios = (e) =>
  {
    this.setState({route: e.target.value})
  }

  handlePagination = (route) =>
  {
    console.log("dasfdasfd")
    switch(route)
    {
      case "Books":
        console.log('went in here')
        this.getPages(route)
        break;
      case "Authors":
        this.getPages(route)
        break;
      case "Subjects":
        this.getPages(route)
        break;
    }
  }

  render(){
    console.log("state", this.state)
    return(
      <div>
        <h1>Browse</h1>
        <input type="number" name="results" value={this.state.results} onChange={(e) => this.setState({results: e.target.value})}  min="1" max="50" />

        <Container>

          <BrowseContainer subjects={this.state.subjects} books={this.state.books}
                           authors={this.state.authors} setBook={this.props.setBook} user={this.props.user}
                           handlePagination={this.handlePagination} />
        </Container>
      </div>
    )
  }
}

export default Browse
