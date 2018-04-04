import React from 'react'
import { connect } from 'react-redux'
import Review from '../../Review'

class Preview extends React.Component {
  render() {
    return (
      <div className='preview'>
        <button onClick={this.props.toggleReviewPreview}>
          <i className="fas fa-window-close"></i>
        </button>
        <Review 
          title={this.props.title}
          reviewText={this.props.reviewText}
        />
        <button id='submitReview'
                onClick={this.submitReview}>
          <i className="fas fa-check-circle"></i>
        </button>
      </div>
    )
  }

  async submitReview() {
    await this.props.addMovie()
    await this.props.addReview()
  }
}

export default Preview