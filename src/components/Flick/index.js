import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadReview } from '../../dux/reviews'

import Review from '../Review'

class Flick extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      review: {},
    }
  }

  componentWillMount() {
    this.props.loadReview(this.props.match.params.reviewId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviewData !== this.props.reviewData) {
      this.setState({
        review: nextProps.reviewData[0]
      })
    }
  }

  render() {
    return (
      <div className='flick'>
        <Review 
          title={this.state.review.title}
          author={{username: this.state.review.author}}
          reviewText= {this.state.review.html}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reviewData: state.reviews.data,
})

const mapDispatchToProps = {
  loadReview,
}

export default connect(mapStateToProps, mapDispatchToProps)(Flick)