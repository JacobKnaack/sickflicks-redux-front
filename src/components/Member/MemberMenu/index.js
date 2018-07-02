import React from 'react'
import PropTypes from 'prop-types'

import './_memberMenu.scss'

class MemberMenu extends React.Component {
  render() {
    return (
      <div className='memberMenu'>
        <button id='postReview'
                className='memberMenuBttn'
                onClick={() => {
                  this.props.toggleMovieForm()
                  this.props.menuSelect()
                }}>
          <i className="far fa-edit"></i>
          <p>Write a Review</p>
        </button>
        <button id='updateReview'
                className='memberMenuBttn'
                onClick={() => {
                  this.props.toggleUpdateForm()
                  this.props.menuSelect()
                }}>
          <i className="fas fa-wrench"></i>
          <p>Update a Review</p>
        </button>
      </div>
    )
  }
}

MemberMenu.propTypes = {
  toggleMovieForm: PropTypes.func,
  menuSelect: PropTypes.func,
}

export default MemberMenu