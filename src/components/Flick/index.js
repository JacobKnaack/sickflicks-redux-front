import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { fetchMovieById } from '../../dux/movies'
import { loadReview, fetchReviewsByMovieId } from '../../dux/reviews'

import Review from '../Review'
import * as util from '../../lib/util'
import './_flick.scss'

class Flick extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      selectedReview: {},
    }
  }

  componentWillMount() {
    this.props.fetchMovieById(this.props.match.params.movieId)
    this.props.fetchReviewsByMovieId(this.props.match.params.movieId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviewData !== this.props.reviewData) {
      this.setState({
        reviews: nextProps.reviewData.sort( (a,b) => {
          return new Date(b.updated_on) - new Date(a.update_on);
        })
      }, () => {
        this.setState({ selectedReview: this.state.reviews[0]})
      })
    }
  }

  render() {
    return (
      <div className='flick'>
        <div className='icon-menu'>
          <div className='review-menu-icon'>
            <i className="fab fa-reddit-alien"></i>
          </div>
          <div className='review-menu-icon'>
            <i className="fab fa-twitter"></i>
          </div>
          <div className='review-menu-icon'>
            <i className="fas fa-share-alt"></i>
          </div>
        </div>
        <div className='review-title-container'>
          <img src={this.props.reviewMovieData.image_path} alt={`${this.props.reviewMovieData.name} poster image`}/>
          <div className='header-info'>
            <h2 id='movie-name'>{this.props.reviewMovieData.name} {`(${new Date(this.props.reviewMovieData.release).getFullYear()})`}</h2>
            <h3 id='post-date'>{util.formatReviewDate(this.props.reviewMovieData.created_on)}</h3>
          </div>
        </div>
        <div className='review-selection-menu'>
          {this.state.reviews.map(review => ( 
              <ButtonBase
                focusRipple
                key={review._id}
                style={{
                  width: '200px',
                }}
              >
                <span className='author-bttn'>
                  <Typography
                    component="span"
                    variant="subheading"
                    color="inherit"
                    className='author-name'
                  >
                    {review.author}
                  </Typography>
                </span>
              </ButtonBase>
            )
          )}
        </div>
        <Review 
          title={this.state.selectedReview.title}
          author={this.state.selectedReview.author}
          reviewText={this.state.selectedReview.html}
        />
      </div>
    )
  }

  handleReviewSelection = (e, value) => {
    this.setState({ value })
  }
}

const mapStateToProps = state => ({
  reviewData: state.reviews.data,
  reviewMovieData: state.movies.reviewMovie,
})

const mapDispatchToProps = {
  fetchMovieById,
  loadReview,
  fetchReviewsByMovieId,
}

export default connect(mapStateToProps, mapDispatchToProps)(Flick)