import React from 'react'
import { Grid, Image, Button, Segment, Loader, Header, Sidebar, Divider, Feed, Icon, Container,Popup, Menu, Label } from 'semantic-ui-react'
import UserCard from './UserCard'
  const CurrentlyReadingContainer = (props) =>
  {
    console.log("currentlyReadingProps", props)
    const userList = props.currentlyReadingList.map(user => <UserCard user={user} /> )
    return (
      <Feed>
        {userList}
      </Feed>
    )
  }
export default CurrentlyReadingContainer
