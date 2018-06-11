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
  }

  componentWillMount() {
    // fetching movie genre information
    fetch(`${__MOVIEDB_API_URL__}/genre/movie/list?api_key=${__MOVIEDB_API_KEY__}&language=en-US`)
      .then(res => res.json())
      .then(genreData => {
        fetch(`${__MOVIEDB_API_URL__}/search/movie?api_key=${__MOVIEDB_API_KEY__}&query=${this.props.movie_name}`)
          .then(res => res.json())
          .then(movieGenres => {
            this.setState({ genres: util.arrayIdMatch(genreData.genres, movieGenres.results[0].genre_ids) })
          })
          .catch(err => alert(err))
      })
      .catch(err => alert(err))
  }

  render() {
    return(
      <Link 
        // changing to movie centered routing instead of review
        // to={`/flick/${this.props.review_id}`}
        to={`/flick/${this.props.movie_id}`}
        className='reviewLink'
      >
        <div className='movieReviewItem'>
          <img
            src={this.props.image_path}
            alt={`${this.props.name} poster img`}
          />
          <div className='itemInfo'>
            <h2>{this.props.movie_name} ({new Date(this.props.release).getFullYear()})</h2> 
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
            <h3 className='reviewDate'>Posted: {util.formatReviewDate(this.props.created_on)}</h3>
          </div>
        </div>
      </Link>
    )
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