import React from 'react'
import { Grid, Image, Button, Segment, Loader, Header, Sidebar, Divider, Feed, Icon, Container,Popup, Menu, Label } from 'semantic-ui-react'

  const UserCard = (props) =>
  {
    console.log("User card props",props.user)
    return (
      <Feed.Event>
        <Feed.Content >
          <Feed.Summary>
            <a>{props.user.user.first_name} {props.user.user.last_name}</a> is reading <a>{props.user.book.title}</a>
          </Feed.Summary>
          <Feed.Date>{Math.floor(Math.random() * 17)} days ago.</Feed.Date>

        </Feed.Content>
      </Feed.Event>
    )
  }
export default UserCard
