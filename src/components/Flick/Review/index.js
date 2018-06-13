import React from 'react'
import PropTypes from 'prop-types'
// import marked from 'marked'

import * as util from '../../../lib/util'
import './_review.scss'

class Review extends React.Component {
  render() {
    return (
      <div className='review'>
        <div className='reviewHeader'>
          <h1 className='reviewTitle'>{this.props.title}</h1>
          <h2 className='reviewAuthor'>{this.props.author} | <span>{util.formatReviewDate(this.props.created_on)}</span></h2>
        </div>
        <div className='reviewText' 
            dangerouslySetInnerHTML={{__html: this.props.reviewText}} /> 
      </div>
    )
  }
}

Review.propTypes = {
  title: PropTypes.string,
  created_on: PropTypes.string,
  author: PropTypes.string,
  reviewText: PropTypes.string,
}

export default Review