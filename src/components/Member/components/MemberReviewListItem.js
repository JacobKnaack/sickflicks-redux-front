import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as util from '../../../lib/util'

const containerStyle = {
  margin: '20px',
}

const MemberReviewListItem = (props) => {
  const { reviewId, title, created_on } = props

  return (
    <Link
      className='member-review-item-container'
      style={containerStyle}
      to={`/member/editor?review=${reviewId}`}
    >
      {/* <img> */}
      <h1 id="review-title">{title}</h1>
      <h3 id="review-date">Created: {util.formatReviewDate(created_on)}</h3>
    </Link>
  )
}

MemberReviewListItem.propTypes = {
  reviewId: PropTypes.string,
  title: PropTypes.string,
  created_on: PropTypes.string,
}

export default MemberReviewListItem