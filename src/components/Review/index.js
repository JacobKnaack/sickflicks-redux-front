import React from 'react'
import marked from 'marked'

import './_review.scss'

class Review extends React.Component {
  render() {
    return (
      <div className='review'>
        <div className='reviewHeader'>
          <h1 className='reviewTitle'>{this.props.title}</h1>
          <h2 className='reviewAuthor'>by {this.props.author.username}</h2>
        </div>
        <div className='reviewText' 
            dangerouslySetInnerHTML={{__html: this.props.reviewText}} /> 
      </div>
    )
  }
}

export default Review