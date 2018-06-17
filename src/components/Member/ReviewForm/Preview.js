import React from 'react'
import Review from '../../Flick/Review'

class Preview extends React.Component {
  render() {
    return (
      <div className='preview'>
        <div className='previewMenu'>
          <button 
            onClick={this.props.toggleReviewPreview}>
            <i className="fas fa-window-close cancelPreviewBtn"></i>
            Back to Review Editor
          </button>
          <button 
            id='submitReview'
            onClick={this.props.submitReview}>
            <i className="fas fa-check-circle submitReviewBtn"></i>
            Submit Review
          </button>
        </div>
        <Review 
          title={this.props.title}
          created_on={new Date().toString()}
          author={this.props.author.username}
          reviewText={this.props.reviewText}
        />
      </div>
    )
  }
}

export default Preview