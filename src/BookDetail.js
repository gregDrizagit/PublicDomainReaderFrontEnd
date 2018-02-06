import React from 'react'

  const BookDetail = (props) =>
  {
    ///here we will render all our collections
    const collections = props.collections.map((coll) => {return <option name={coll.name} key={coll.id}>{coll.name}</option>})
    return(
      <div>
        <select onChange={props.selectCollection} >
          {collections}
        </select>
        <button onClick={()=> props.addBookToCollection()}>Add book</button>
      </div>
    )

  }

export default BookDetail
// <button onClick={this.addBookToCollection}>Add to Collection</button> }
