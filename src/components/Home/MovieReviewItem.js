import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as util from '../../lib/util'

class MovieReviewItem extends React.Component {
  constructor() {
    super()
    this.state = {
      genres: []
    }

    this.fetchMovieGenresWithRetry = this.fetchMovieGenresWithRetry.bind(this)
    this.fetchGenreWrapper = (func) => {
      setTimeout(() => {
        func()
      }, 4000)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.genres !== nextProps.genres && nextProps.genres) {
      this.fetchMovieGenresWithRetry(10)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.fetchGenreWrapper)
  }

  render() {
    return (
      <Link
        to={`/flick/${this.props.movie_id}`}
        className='reviewLink'
      >
        <div className='movieReviewItem'>
          <img
            className='posterImg'
            src={this.props.image_path}
            alt={`${this.props.name} poster img`}
          />
          <div className='itemInfo'>
            <h2 className='reviewMovie'>{this.props.movie_name} ({new Date(this.props.release).getFullYear()})</h2>
            <h3 className='reviewTag'>Review</h3>
            <div className='genreContainer'>
              {util.renderIf(!this.state.genres.length,
                <p className='load'>Loading...</p>
              )}
              {this.state.genres.map(genre => {
                return (
                  <p key={genre}
                    className='genreName'>
                    {genre}
                  </p>
                )
              })}
            </div>
            <h3 className='reviewDate'>{util.formatReviewDate(this.props.created_on)}</h3>
          </div>
        </div>
      </Link>
    )
  }

  fetchMovieGenresWithRetry(maxRetries, retryCount) {
    // fetching movie genre information with retry when too many requests error
    retryCount = retryCount || 0

    fetch(`${__MOVIEDB_API_URL__}/search/movie?api_key=${__MOVIEDB_API_KEY__}&query=${this.props.movie_name}`)
      .then(res => res.json())
      .then(movieGenres => {
        if (movieGenres.status_code === 25 && retryCount <= maxRetries) {
          console.error('429 detected, retrying in 4000ms')
          this.fetchGenreWrapper(() => this.fetchMovieGenresWithRetry(maxRetries, retryCount++))
        } else {
          this.setState({ genres: util.arrayIdMatch(this.props.genres, movieGenres.results[0].genre_ids) })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}

MovieReviewItem.propTypes = {
  movie_name: PropTypes.string,
  release: PropTypes.string,
  title: PropTypes.string,
  review_id: PropTypes.string,
  author: PropTypes.string,
  created_on: PropTypes.string,
  image_path: PropTypes.string,
  genres: PropTypes.array,
}

export default MovieReviewItem
