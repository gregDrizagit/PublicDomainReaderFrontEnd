import React from 'react'
import Adapter from './adapter'
import BookCard from './BookCard'
class Search extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      allBooks:[],
      filteredBooks: [],
      errors: null,
      query:"",
      currentUser: props.user
    }
  }

  componentDidMount()
  {
    const token = localStorage.getItem('token')
    if(token){
       Adapter.getCurrentUser().then(user => {
          this.setState({currentUser: user})
        })
    }else {
      this.props.history.push('/login')
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
    Adapter.searchBooks(this.state.query).then(books => {
      if(books.length > 0)
      {
        this.setState({filteredBooks: books})
      }else{
        alert(`We didn't find anything for ${this.state.query}`)
      }
    })
  }


  render(){
    const bookCards = this.state.filteredBooks.map((book)=>{return <li> <BookCard book={book} setBook={this.props.setBook} currentUser={this.state.currentUser} /> </li>})
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
