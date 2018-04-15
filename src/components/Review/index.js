import React from 'react'
import PropTypes from 'prop-types'
// import marked from 'marked'

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

Review.propTypes = {
  title: PropTypes.string,
  author: PropTypes.object,
  reviewText: PropTypes.string,
}

export default Review