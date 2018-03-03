import React from 'react'
import { Grid, Image, Button, Segment, Loader, Header, Sidebar, Divider, Feed, Icon, Container,Popup, Menu, Label } from 'semantic-ui-react'
import UserCard from './UserCard'
  const CurrentlyReadingContainer = (props) =>
  {
    console.log(props.currentlyReadingList)
    if(props.currentlyReadingList.length > 0)
    {
      const userList = props.currentlyReadingList.map(user => <UserCard setBook={props.setBook} user={user} /> )
      return (
        <Feed>
          {userList}
        </Feed>
      )
    }else {
      return(
        <Feed>
          <h1>Nobody is reading anything yet!</h1>
        </Feed>
      )
    }
  }
export default CurrentlyReadingContainer
