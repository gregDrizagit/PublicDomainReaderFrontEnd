import React from 'react'
import BookCard from './AuthorCard'
class AuthorCard extends React.Component
{
  ///Each author card is going to render on click the authors detail
  //We didn't get much data for the author, so we can render his name, birth and death year, and hist list of books
  //I'm thinking that the list of books can maybe exist in a drop down from each author card
  //We will be rendering book cards in the drop down, so we should have all of the same functionality that we would have anywhere else
  
  constructor()
  {
    super()
    this.state = {

    }
  }

  render()
  {
    return(
      <div>

      </div>
    )
  }
}
export default AuthorCard
