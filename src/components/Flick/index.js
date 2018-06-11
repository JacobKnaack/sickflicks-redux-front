import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase'
import { loadReview, fetchReviewsByMovieId } from '../../dux/reviews'

import Review from '../Review'

// TODO: update so the flick route contains all reviews for a flick instead of just the one.
class Flick extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      value: 0,
    }
  }

  componentWillMount() {
    this.props.fetchReviewsByMovieId(this.props.match.params.movieId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviewData !== this.props.reviewData) {
      this.setState({
        reviews: nextProps.reviewData
      }, console.log(this.state))
    }
  }

  render() {
    return (
      <div className='flick'>
        {/* Create Header and Review Selection Component */}
        {this.state.reviews.map(review => {
          return (<div>{review.html}</div>)
        })}
      </div>
    )
  }

  handleTabChange = (e, value) => {
    this.setState({ value })
  }
}

const mapStateToProps = state => ({
  reviewData: state.reviews.data,
})

const mapDispatchToProps = {
  loadReview,
  fetchReviewsByMovieId,
}

export default connect(mapStateToProps, mapDispatchToProps)(Flick)