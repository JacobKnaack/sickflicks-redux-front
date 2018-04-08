import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchMovies } from '../../../dux/tmdb'

import ReviewForm from '../ReviewForm'
import * as util from '../../../lib/util'
import './_movieForm.scss'

class MovieForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieTitle: '',
      movieImage: '',
      releaseDate: '',
      tmdb_id: null,
      reviewArray: [],
      formOpen: false,
    }

    this.toggleReviewForm = this.toggleReviewForm.bind(this)
    this.movieSearch = this.movieSearch.bind(this)
    this.selectMovie = this.selectMovie.bind(this)
  }

  render() {
    return (
      <div className='movieForm'>
      {util.renderEither(this.state.movieTitle && this.state.releaseDate,
        <ReviewForm 
          tmdb_id={this.state.tmdb_id}
          movieTitle={this.state.movieTitle}
          releaseDate={this.state.releaseDate}
          imagePath={this.state.movieImage}
        />,
        <div>
          <input
            className='moviePrompt'
            type='text'
            name='movieTitle'
            value={this.state.movieTitle}
            onChange={this.movieSearch}
            placeholder='What Movie Are You Reviewing?'
            autoComplete='off'
          />
          <div className='movieSearchResults'>
            {this.displayMovieSearchList(this.props.movieSearch)}
          </div>
        </div>
      )}
      </div>
    )
  }

  displayMovieSearchList(movieArray) {
    const movieSearchElements= []

    if (this.state.movieTitle.length > 0 && Array.isArray(movieArray)) {
      movieArray.map(movie => {
        let imagePath
        if (movie.poster_path == null) {
          imagePath = 'https://cdn4.iconfinder.com/data/icons/web-links/512/40-256.png'
        } else {
          imagePath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        }

        movieSearchElements.push(
          <div key={movie.id}
               className='movieSearchListItem'
               onClick={() => this.selectMovie(movie.id, movie.title, movie.release_date, imagePath)}>
            <h3>{movie.title}</h3>
            <h4>{movie.release_date}</h4>
            <img src={imagePath} alt={movie.title} />
          </div>
        )
      })
    } else {
      movieSearchElements.push(
        <div key='noTitle'
             className='noTitle'>
          <h2>Enter a movie title to get started</h2>
        </div>
      )
    }

    return movieSearchElements
  }

  toggleReviewForm() {
    this.setState({
      formOpen: !this.state.formOpen,
    })
  }

  movieSearch(e) {
    const { name, value } = e.target
    this.setState({ [name]: value }, () => {
      if (this.state.movieTitle.length > 0) {
        this.props.searchMovies(this.state.movieTitle)
      }
    })
  }

  selectMovie(id, title, releaseDate, imagePath) {
    this.setState({
      tmdb_id: id,
      movieTitle: title,
      releaseDate: releaseDate,
      movieImage: imagePath,
    })
  }
}

MovieForm.propTypes = {
  searchMovies: PropTypes.func,
}

const mapStateToProps = state => ({
  member: state.member.data.author,
  searchingMovies: state.tmdb.isFetching,
  movieSearch: state.tmdb.data
})

export default connect(mapStateToProps, { searchMovies })(MovieForm)
