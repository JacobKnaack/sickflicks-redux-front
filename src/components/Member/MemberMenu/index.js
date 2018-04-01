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
                }} >
          <i className="fas fa-pen-square"></i>
          <p>Write a Review</p>
        </button>
      </div>
    )
  }
}

MemberMenu.propTypes = {
  toggleMovieForm: PropTypes.func,
}

export default MemberMenu