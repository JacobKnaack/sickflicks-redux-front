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
          reviewText={this.props.reviewText}
        />
      </div>
    )
  }
}

export default Preview