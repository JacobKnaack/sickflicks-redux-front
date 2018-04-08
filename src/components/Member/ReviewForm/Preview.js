import React from 'react'
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
          author={this.props.author}
          reviewText={this.props.reviewText}
        />
        <button id='submitReview'
                onClick={this.props.submitReview}>
          <i className="fas fa-check-circle"></i>
        </button>
      </div>
    )
  }
}

export default Preview