import React from 'react'
import Adapter from './adapter'
import BookCard from './BookCard'
import AuthorCard from './AuthorCard'
import SubjectCard from './SubjectCard'
class Browse extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      subjectsPage: 1,
      subjects: [],

      authorsPage:1,
      authors: [],

      booksPage:1,
      books: [],

      results:20,
      route:"",
      cardsToRender: null

    }
  }

  getPages = (route) =>
  {
    switch(route)
    {
      case "book_list":
        console.log("went in here")
        Adapter.getPage(this.state.booksPage, this.state.results, route).then(books => {
            const joinedBooks = this.state.books.concat(books)
            this.setState({books: joinedBooks, booksPage: this.state.booksPage += 1}, this.renderBookCards())
            console.log(joinedBooks)
          })
        break;
      case "author_list":
        Adapter.getPage(this.state.authorsPage, this.state.results, route).then(authors => {
          const joinedAuthors = this.state.authors.concat(authors)
          this.setState({authors: joinedAuthors, authorsPage: this.state.authorsPage += 1}, this.renderAuthorCards())


        })
        break;
      case "subject_list":
        Adapter.getPage(this.state.subjectsPage, this.state.results, route).then(subjects => {
          const joinedSubject = this.state.subjects.concat(subjects)
          this.setState({subjects: joinedSubject, subjectsPage: this.state.subjectsPage += 1}, this.renderSubjectCards())
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

  renderAuthorCards = () =>
  {
    if(this.state.authors.length > 0)
    {
      const authorCards = this.state.authors.map((author) => <AuthorCard author={author} setBook={this.props.setBook}/>)
      this.setState({cardsToRender: authorCards})

    }
    else
    {
      console.log("Loading")
    }
  }

  renderSubjectCards = () =>
  {
    if(this.state.subjects.length > 0)
    {
      const subjectCards = this.state.subjects.map((subject) => <SubjectCard subject={subject} setBook={this.props.setBook} />)
      this.setState({cardsToRender: subjectCards})
    }
    else
    {
      console.log("Loading")
    }
  }

  renderBookCards = () =>
  {
    if(this.state.books.length > 0)
    {
      const bookCards = this.state.books.map((book) => <BookCard book={book} currentUser={this.props.user} setBook={this.props.setBook} />)
      this.setState({cardsToRender: bookCards}, console.log(bookCards))

    }else
    {
      console.log("loading")
    }
  }

  handleRadios = (e) =>
  {
    this.setState({route: e.target.value})
  }
  handlePagination = (route) =>
  {
    switch(route)
    {
      case "book_list":
        console.log('went in here')
        this.getPages(route)
        break;
      case "author_list":
        this.getPages(route)
        break;
      case "subject_list":
        this.getPages(route)
        break;
    }
  }

  render(){
    console.log("state", this.state)
    return(
      <div>
        <h1>Browse</h1>
        <input type="number" name="results" value={this.state.results} onChange={(e)=> this.setState({results: e.target.value})}  min="1" max="50" />
        <form onChange={(e) => this.handleRadios(e)}>
          <input type="radio" name="route" value="book_list" onClick={()=>this.renderBookCards()} /> Books
          <input type="radio" name="route" value="author_list" onClick={() => this.renderAuthorCards()} /> Authors
          <input type="radio" name="route" value="subject_list" onClick={() => this.renderSubjectCards()} />Subjects
        </form>
        <div className="book_cards">
          {this.state.cardsToRender}
        </div>
        <button onClick={() => this.handlePagination(this.state.route)}>Next Page</button>

      </div>
    )
  }
}

export default Browse
