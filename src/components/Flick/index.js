import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import { fetchMovieById } from '../../dux/movies'
import { loadReview, fetchReviewsByMovieId, removeReviewData } from '../../dux/reviews'

import Review from './Review'
import * as util from '../../lib/util'
import './_flick.scss'

class Flick extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      selectedReview: {},
    }

    this.handleReviewSelection = this.handleReviewSelection.bind(this)
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
        if (!this.state.selectedReview._id) {
          this.handleReviewSelection(this.state.reviews[0])
        }
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      reviews: [],
      selectedReview: {},
    }, this.props.removeReviewData())
  }

  render() {
    const movieTitle = this.props.reviewMovieData.name || ''

    return (
      <div className='flick'>
        {util.renderEither(this.props.fetchingMovieData || !util.parseUrlQuery('review'),
          <div className='loadingContainer'>
            <h2>Loading Review...</h2>
            <CircularProgress id='loadElement' size={150} color='secondary' />
          </div>,
          <div className='reviewContainer'>
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
              <img src={this.props.reviewMovieData.image_path} alt={`${movieTitle} poster image`} />
              <div className='header-info'>
                <h2 id='movie-name'>{movieTitle}</h2>
                <h3 id='release-date'><span>Released</span> {util.formatMovieRelease(this.props.reviewMovieData.release)}</h3>
                <div id='watch-now'>
                  <a
                    href={`https://www.justwatch.com/us/movie/${util.convertToKabob(movieTitle)}`}
                    target='_blank'
                  >
                    Watch Now!
                  </a>
                </div>
              </div>
            </div>
            <div className='review-selection-menu'>
              {this.state.reviews.map(review => {
                let buttonClasses = `review-selection-btn ${review.author.toLowerCase()}`
                switch (this.state.reviews.length) {
                  case 1:
                    buttonClasses += ' single'
                    break
                  case 2:
                    buttonClasses += ' double'
                    break
                  case 3:
                    buttonClasses += ' triple'
                    break
                }

                if (review.author === this.state.selectedReview.author) {
                  buttonClasses += ' selected'
                }

                return (
                  <ButtonBase
                    focusRipple
                    className={buttonClasses}
                    key={review._id}
                    style={{
                      width: '200px',
                    }}
                    onClick={() => this.handleReviewSelection(review)}
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
              }
              )}
            </div>
            <Review
              title={this.state.selectedReview.title}
              created_on={this.state.selectedReview.created_on}
              author={this.state.selectedReview.author}
              reviewText={this.state.selectedReview.html}
            />
          </div>
        )}
      </div>
    )
  }

  handleReviewSelection = (reviewObj) => {
    this.setState({ selectedReview: reviewObj }, () => {
      if(!window.location.href.includes(reviewObj._id)) {
        window.location.href += `?review=${reviewObj._id}`
      }
    })
  }

}

Flick.propTypes = {
  fetchingReviewData: PropTypes.bool,
  fetchingMovieData: PropTypes.bool,
  reviewData: PropTypes.array,
  reviewMovieData: PropTypes.object,
}

const mapStateToProps = state => ({
  fetchingReviewData: state.reviews.isFetching,
  fetchingMovieData: state.movies.isFetching,
  reviewData: state.reviews.data,
  reviewMovieData: state.movies.reviewMovie,
})

const mapDispatchToProps = {
  fetchMovieById,
  loadReview,
  fetchReviewsByMovieId,
}

export default connect(mapStateToProps, mapDispatchToProps)(Flick)