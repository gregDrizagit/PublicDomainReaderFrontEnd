import React from 'react'
import Adapter from './adapter'
import BrowseContainer from './BrowseContainer'
import CategoryModal from './CategoryModal'
import NavBar from './NavBar'

import { Container } from 'semantic-ui-react'

class Browse extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      subjectsPage: 1,
      subjects: [],
      subjectCards: [],

      bookshelfPage: 1,
      bookshelves: [],
      bookshelfCards: [],

      authorsPage:1,
      authors: [],
      authorCards: [],

      booksPage:1,
      books: [],
      bookCards: [],

      results:20,
      route:"",
      showCategory: false,
      categoryToShow: "",
      categoryId: null
    }
  }

  getPages = (route) =>
  {
    switch(route)
    {
      case "Books":
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

      case "Bookshelves":
        Adapter.getPage(this.state.bookshelfPage, 10, "bookshelf_list").then(bookshelves => {
          const joinedBookshelves = this.state.bookshelves.concat(bookshelves)
          this.setState({bookshelves: joinedBookshelves, bookshelfPage: this.state.bookshelfPage += 1})
        })
        break;
    }
  }

  toggleVisibility = () =>
  {
    this.setState({sidebar: !this.state.sidebar})
  }

  showCategory = (id, category) =>
  {
    this.setState({showCategory: !this.state.showCategory,
                  categoryId: id,
                  categoryToShow: category})

  }

  componentDidMount()
  {
     this.getPages("book_list")
     this.getPages("author_list")
     this.getPages("subject_list")
     this.getPages("bookshelf_list")
  }

  handleRadios = (e) =>
  {
    this.setState({route: e.target.value})
  }

  handlePagination = (route) =>
  {
    switch(route)
    {
      case "Books":
        this.getPages(route)
        break;
      case "Authors":
        this.getPages(route)
        break;
      case "Subjects":
        this.getPages(route)
        break;
      case "Bookshelves":
        this.getPages(route)
        break;
    }
  }

  render(){
    return(
      <Container>
        <NavBar mountedBy={"browse"} user={this.props.user} logout={this.props.logout} history={this.props.history} />
        {
        this.state.showCategory ?
        <div>
          <CategoryModal id={this.state.categoryId} user={this.props.user} setBook={this.props.setBook} category={this.state.categoryToShow} />
        </div>
        :
        null
        }

        <BrowseContainer subjects={this.state.subjects} books={this.state.books}
                         bookshelves={this.state.bookshelves}
                          authors={this.state.authors} setBook={this.props.setBook} user={this.props.user}
                          handlePagination={this.handlePagination}
                          showCategory={this.showCategory}
                          />


      </Container>
    )
  }
}

export default Browse

// <CategoryShow id={this.state.categoryId} user={this.props.user} setBook={this.props.setBook} category={this.state.categoryToShow}  />
