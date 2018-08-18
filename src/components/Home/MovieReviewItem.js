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
  }

  componentWillMount() {
    this.fetchMovieGenresWithRetry(5)
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
            <h3 className='reviewTag'>The Sick Flicks Review</h3>
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

    fetch(`${__MOVIEDB_API_URL__}/genre/movie/list?api_key=${__MOVIEDB_API_KEY__}&language=en-US`)
      .then(res => res.json())
      .then(genreData => {
        fetch(`${__MOVIEDB_API_URL__}/search/movie?api_key=${__MOVIEDB_API_KEY__}&query=${this.props.movie_name}`)
          .then(res => res.json())
          .then(movieGenres => {
            this.setState({ genres: util.arrayIdMatch(genreData.genres, movieGenres.results[0].genre_ids) })
          })
          .catch(err => {
            if (err.statusCode === 429 && retryCount <= maxRetries) {
              console.error('429 detected, retrying after ' + err.headers['retry-after'] + 'ms')
              setTimeout(() => {
                this.fetchMovieGenresWithRetry(maxRetries, retryCount++)
              }, err.headers['retry-after'])
            }
          })
      })
      .catch(err => alert('error fetching movie genre list: ', err))
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

}

export default MovieReviewItem