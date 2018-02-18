import React from 'react'
import BookCard from './BookCard'
const CollectionShow = (props) =>
{
    ///here we will render all our collections

  const books = props.collection.books.map((book) =>{return <BookCard bookJson={book} mountedByCollectionColl={true} setBook={props.setBook}/> })
  return(
    <div>
        {books}
    </div>
  )
}
export default CollectionShow
