import React from 'react'

const CollectionShow = (props) =>
{
    ///here we will render all our collections
  
  const books = props.collection.books.map((book) =>{return <li>{book.title}</li> })
  return(
    <div>
      <ul>
        {books}
      </ul>
    </div>
  )
}
export default CollectionShow
