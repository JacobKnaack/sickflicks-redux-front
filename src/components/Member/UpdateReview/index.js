import React from 'react'
import { connect } from 'react-redux'

import { fetchReviewsByAuthor } from '../../../dux/reviews'
import * as util from '../../../lib/util'
import './_updateReview.scss'

class UpdateReview extends React.Component {
  componentWillMount() {
    this.props.fetchReviewsByAuthor(this.props.author.username)
  }

  render() {
    return (
      <div className='UpdateReview'>
        {util.renderEither(this.props.loadingReviews,
          <div className='reviewLoad'>
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>,
          <div className='reviewsContainer'>
            {util.renderEither(this.props.reviews.length,
              <div className='authorReviewsList'>
                {this.props.reviews.map(review => 
                  <div>
                    <h2 key={review.title}>{review.title}</h2>
                  </div>
                )}
              </div>,
              <div className='noReviews'>
                <p>No Reviews submitted</p>
              </div>
            )}
          </div>
        )}
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

const mapStateToProps = state => ({
  reviews: state.reviews.data,
  loadingReviews: state.reviews.isFetching,
})

const mapDispatchToProps = {
  fetchReviewsByAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReview)