import React from 'react'
import marked from 'marked'

import './_review.scss'

class Review extends React.Component {
  render() {
    return (
      <div className='review'>
        <h1 className='reviewTitle'>{this.props.title}</h1>
        <div className='reviewtext'
             dangerouslySetInnerHTML={this.formatReview(this.props.reviewText)} />
      </div>
    )
  }

  formatReview(text) {
    console.log(text)
    return {__html: marked(text)}
  }
}

export default Review