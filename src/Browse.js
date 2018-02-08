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
      route:""

    }
  }

  getPages = (route) =>
  {
    console.log('up in here', route)
    switch(route)
    {
      case "book_list":
        console.log("went in here")
        Adapter.getPage(this.state.booksPage, this.state.results, route).then(books => this.setState({books: books, booksPage: this.state.booksPage+=1}))
        break;
      case "author_list":
        Adapter.getPage(this.state.authorsPage, this.state.results, route).then(authors => this.setState({authors: authors, authorsPage: this.state.authorsPage+=1}))
        break;
      case "subject_list":
        Adapter.getPage(this.state.subjectsPage, this.state.results, route).then(subjects => this.setState({subjects: subjects, subjectsPage: this.state.subjectsPage+=1}))
        break;
    }
  }

  componentDidMount()
  {


  }

  renderAuthorCards = () =>
  {
    if(this.state.authors.length > 0)
    {
      const authorCards = this.state.authors.map((author) => <AuthorCard author={author} setBook={this.setBook}/>)
    }
  }

  renderSubjectCards = () =>
  {
    if(this.state.subjects.length > 0)
    {
      const subjectCards = this.state.subjects.map((subject) => <SubjectCard subject={subject} setBook={this.setBook} />)
    }
  }

  renderBookCards = () =>
  {
    if(this.state.books.length > 0)
    {
      const bookCards = this.state.books.map((book) => <BookCard user={this.props.user} setBook={this.setBook} />)
    }
  }

  handlePagination = (route) =>
  {
    switch(route)
    {
      case "book_list":
        console.log("went in here")
        this.getPages(this.state.route)
        break;
      case "author_list":
        this.setState({authorsPage: this.state.authorsPage++})
        break;
      case "subject_list":
        this.setState({subjectsPage: this.state.subjectsPage++})
        break;
    }
  }

  handleRadios = (e) =>
  {
    this.setState({route: e.target.value})
  }

  render(){
    console.log(this.state.booksPage)
    console.log(this.state)
    return(
      <div>
        <h1>Browse</h1>
        <input type="number" name="results" value={this.state.results} onChange={(e)=> this.setState({results: e.target.value})}  min="1" max="50" />
        <form onChange={(e) => this.handleRadios(e)}>
          <input type="radio" name="route" value="book_list" /> Books
          <input type="radio" name="route" value="author_list" /> Authors
          <input type="radio" name="route" value="subject_list" />Subjects
        </form>
        <button onClick={() => this.handlePagination("book_list")}>Next Page</button>

      </div>
    )
  }
}

export default Browse
