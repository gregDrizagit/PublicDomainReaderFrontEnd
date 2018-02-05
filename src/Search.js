import React from 'react'
import Adapter from './adapter'
import BookCard from './BookCard'
class Search extends React.Component
{
  constructor(props)
  {
    super(props)
    console.log("props in search constructor",props)
    this.state = {
      allBooks:[],
      filteredBooks: [],
      query:"",
      collections: props.user.collections
    }
  }

  componentDidMount()
  {
    const token = localStorage.getItem('token')
    if(token){
       Adapter.getCurrentUser().then(user => {
         console.log(user)
          const currentUser = {currentUser: user}
          this.setState({auth: currentUser})
        })
    }else {
      this.props.history.push('/')
    }
  }

  handleInputChange = (e) =>
  {
    // const searchedBooks = this.state.allBooks.filter((book) => {return book.title.includes(e.target.value)})
    this.setState({query: e.target.value})
  }
  searchBooks = (e) =>
  {
    e.preventDefault()
    Adapter.searchBooks(this.state.query).then(books => this.setState({filteredBooks: books}))
  }

  render(){
    console.log("In Search", this.state)
    const bookCards = this.state.filteredBooks.map((book) =>{ return <li> <BookCard key={book.id} collections={this.state.collections} book={book} /> </li>})
    return(
      <div>
        <form onSubmit={this.searchBooks}>
          <input type="text" name="search" placeholder="Search for book" onChange={this.handleInputChange} />
          <button type="submit">Search</button>
        </form>

        <ul>
          {bookCards}
        </ul>
      </div>
    )
  }
}

export default Search
