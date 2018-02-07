import React from 'react'
import BookCard from './BookCard'
const CollectionShow = (props) =>
{
    ///here we will render all our collections

  const books = props.collection.books.map((book) =>{return <li><BookCard book={book} setBook={props.setBook}/></li> })
  return(
    <div>
      <ul>
        {books}
      </ul>
    </div>
  )
}
export default CollectionShow
