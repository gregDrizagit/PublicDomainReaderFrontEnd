import React from 'react'
import Adapter from './adapter'
import BookCard from './BookCard'
import SubjectCard from './SubjectCard'
import AuthorCard from './AuthorCard'
import BookshelfCard from './BookshelfCard'
import CategoryModal from './CategoryModal'
import NavBar from './NavBar'
import logo from './images/logo.png'

import { Grid, Image, Button, Segment, Input, Container, Icon, Card, Loader, Header, Dimmer } from 'semantic-ui-react'


class Search extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      allBooks:[],
      filteredBooks: [],
      filteredAuthors: [],
      filteredSubjects: [],
      filteredBookshelves: [],
      errors: null,
      advancedSearch: true,
      query:"",
      showAuthors: false,
      showSubjects: false,
      showBookshelves: false,
      showBooks: false,
      loading: false,
      showCategory: false,
      categoryToShow: "",
      categoryId: null,
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

  displaySearchResults = () =>
  {
    let cardsToShow = []
    if(!this.state.showAuthors && !this.state.showBooks && !this.state.showSubjects && !this.state.showBookshelves)
    {
      cardsToShow = [...this.state.filteredAuthors, ...this.state.filteredBooks, ...this.state.filteredSubjects, this.state.filteredBookshelves]
    }
    if(this.state.showAuthors)
    {
      if(this.state.filteredAuthors.length > 0 )
      {
         cardsToShow = [...cardsToShow, ...this.state.filteredAuthors]
      }
      else {
        alert("no authors")
        this.setState({showAuthors: false})
      }
    }
    if(this.state.showSubjects)
    {
      if(this.state.filteredSubjects.length > 0)
      {
        cardsToShow = [...this.state.filteredSubjects, ...cardsToShow]
      }
      else
      {
        alert("no subjects")
        this.setState({showSubjects: false})

      }
    }
    if(this.state.showBookshelves)
    {
      if(this.state.filteredBookshelves.length > 0)
      {
        cardsToShow = [...this.state.filteredBookshelves, ...cardsToShow]
      }
      else {
        alert("no bookshelves")
        this.setState({showBookshelves:false})
      }
    }
    if(this.state.showBooks)
    {
      if(this.state.filteredBooks.length > 0)
      {
        cardsToShow = [...this.state.filteredBooks, ...cardsToShow,]
      }
    }
    return cardsToShow
  }

  debounceEvent = (callback, time) => {
  let interval;
    return (...args) => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;
        callback(...args);
      }, time);
    }
  }

  toggleIcon = () =>
  {
    if(this.state.advancedSearch)
    {
      return "chevron up"
    }else {
      return "chevron down"
    }
  }

  showCategory = (id, category) =>
  {
    this.setState({showCategory: !this.state.showCategory,
                  categoryId: id,
                  categoryToShow: category})

  }

  showCategoryModal = () =>
  {
    if(this.state.showCategory)
    {
      return <CategoryModal id={this.state.categoryId} user={this.props.user} setBook={this.props.setBook} category={this.state.categoryToShow} />
    }else
    {
      return null
    }
  }

  searchBooks = () =>
  {
    let cards
    if(this.state.query !== "")
    {
      this.setState({loading: true})
      Adapter.searchBooks(this.state.query).then(results => {
        this.setState({filteredBooks:[], filteredAuthors:[], filteredSubjects:[], filteredBookshelves:[], loading: false})
        Object.keys(results).forEach(key =>{
          if(results[key].length > 0)
          {
            switch(key)
            {
              case "filteredBooks":
                 cards = results[key].map(book => {return <BookCard key={book.id} bookJson={book} setBook={this.props.setBook} currentUser={this.state.currentUser}/> })
                 this.setState({filteredBooks: cards})
                break;
              case "filteredAuthors":
                 cards = results[key].map(author => { return <AuthorCard showCategory={this.showCategory} key={author.id} author={author}/> })
                 this.setState({filteredAuthors: cards})
                break;
              case "filteredSubjects":
                 cards = results[key].map(subject => { return <SubjectCard key={subject.id} showCategory={this.showCategory} subject={subject}/> })
                 this.setState({filteredSubjects: cards})
                break;
              case "filteredBookshelves":
                cards = results[key].map(bookshelf => { return <BookshelfCard key={bookshelf.id} showCategory={this.showCategory} bookshelf={bookshelf}/> })
                this.setState({filteredBookshelves: cards})
                break;
            }
          }
        })
      })
    }else
    {
      alert("Please enter a search query")
    }
  }

  controlInput = (e) =>
  {
    this.setState({query: e.target.value})
  }
  preventDefault = (e) =>
  {
    e.preventDefault()
  }


  render(){
    console.log(this.state)
    return(
      <div>
      <Container>
        <NavBar mountedBy={"search"} user={this.props.user} history={this.props.history}/>
          <Segment color="olive">
              <form onSubmit={this.preventDefault}>
                <Input fluid size="huge" type="text" onInput={this.controlInput} value={this.state.query} name="search" placeholder="Search for book" onChange={this.debounceEvent(this.searchBooks, 1000)} />
              </form>

              <Icon name={this.toggleIcon()} onClick={()=>this.setState({advancedSearch: !this.state.advancedSearch})} />
              {
              this.state.advancedSearch ?
                <div>
                  <h5>Show only: </h5>
                  <Button.Group disabled basic size="tiny">
                   <Button toggle active={this.state.showAuthors} onClick={()=>this.setState({showAuthors: !this.state.showAuthors})}>Authors</Button>
                   <Button toggle active={this.state.showSubjects} onClick={()=>this.setState({showSubjects: !this.state.showSubjects})}>Subjects</Button>
                   <Button toggle active={this.state.showBookshelves} onClick={()=>this.setState({showBookshelves: !this.state.showBookshelves})}>Bookshelves</Button>
                   <Button toggle active={this.state.showBooks} onClick={()=>this.setState({showBooks: !this.state.showBooks})}>Books</Button>
                  </Button.Group>
                </div>
                :
                null
              }
          </Segment>
          {
            this.state.loading ?
            <Container>
              <Segment textAlign="center">
                <Loader active inline size='large'>Fetching books...</Loader>
              </Segment>
            </Container>
            :
            <Segment>
              <Card.Group centered itemsPerRow={4}>
                  {this.displaySearchResults()}
                  {this.showCategoryModal()}
              </Card.Group>
            </Segment>
          }
        </Container>
      </div>
    )
  }
}

export default Search
