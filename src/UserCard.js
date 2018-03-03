import React from 'react'
import Adapter from './adapter'

import { Grid, Image, Button, Segment, Loader, Header, Sidebar, Divider, Feed, Icon, Container,Popup, Menu, Label } from 'semantic-ui-react'

  const UserCard = (props) =>
  {
    console.log("User card props",props.user.book)

    return (
      <Feed.Event>
        <Feed.Content >
          <Feed.Summary>
            <a>{props.user.user.first_name} {props.user.user.last_name}</a> is reading <a onClick={() => handleSetBook(props.setBook, props.user.book)}>{props.user.book.title}</a>
          </Feed.Summary>
          <Feed.Date>{Math.floor(Math.random() * 17)} days ago.</Feed.Date>

        </Feed.Content>
      </Feed.Event>
    )
  }

  const handleSetBook = (setBook, book) =>
  {
    let bookMeta = {bookId: book.id, htmlUrl: book.html_url, bookJson: book}
    Adapter.getHtmlForBook(bookMeta.htmlUrl).then(book => {
      bookMeta.bookHtml = book
      setBook(bookMeta)
    })
  }
export default UserCard
