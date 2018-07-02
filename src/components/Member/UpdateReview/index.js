import React from 'react'
import { connect } from 'react-redux'

class UpdateReview extends React.Component {
  render() {
    return (
      <div className='UpdateReview'>
        <h2>Updating a Review</h2>
        <button onClick={() => {
          this.props.toggleUpdateForm()
          this.props.menuSelect()
        }}>
          Close
        </button>
      </div>
    )
  }
 }

export default UpdateReview