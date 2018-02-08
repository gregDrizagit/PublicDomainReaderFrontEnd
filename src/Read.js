import React from 'react'
import renderHTML from 'react-render-html';

class Read extends React.Component
{
  constructor(props)
  {
    console.log("in read")
    super(props)
    this.state = {
      book: props.book
    }
  }

  createMarkup = () =>
  {
    return {__html: this.state.book};
  }



  render(){
    console.log(this.state)
    return(
      <div>
        <button onClick={() => this.props.history.push('/')}>Collections</button>
        <button onClick={() => this.props.history.push('/search')}>Search</button>
        {renderHTML(this.state.book)}
      </div>
    )
  }
}
export default Read
