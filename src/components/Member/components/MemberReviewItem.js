import React from 'react'
import * as util from '../../../lib/util'

const containerStyle = {
  margin: '20px',
}

const MemberReviewItem = (props) => {
  return (
    <div
      className='member-review-item-container'
      style={containerStyle}
    >
      {/* <img> */}
      <h1 id="review-title">{props.title}</h1>
      <h3 id="review-date">Created: {util.formatReviewDate(props.created_on)}</h3>
    </div>
  )
}

export default MemberReviewItem