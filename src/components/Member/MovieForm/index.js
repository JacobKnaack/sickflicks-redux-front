import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchMovies, selectMovie } from '../../../dux/tmdb'

import * as util from '../../../lib/util'
import './_movieForm.scss'

class MovieForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieName: '',
      releaseDate: '',
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
        <form className='reviewForm'>
          <h3>What Movie are you reviewing?</h3>
          <input
            type='text'
            name='movieName'
            value={this.state.movieName}
            onChange={this.movieSearch}
          />
          <div className='movieSearchResults'>
            {this.displayMovieSearchList(this.props.movieSearch)}
          </div>
        </form>
      </div>
    )
  }

  displayMovieSearchList(movieArray) {
    const movieSearchElements= []

    if (this.state.movieName.length > 0) {
      movieArray.map(movie => {
        movieSearchElements.push(
          <div key={movie.id}
               className='movieSearchListItem'
               onClick={() => this.selectMovie(movie.id, movie.title, movie.release_date)}>
            <h3>{movie.title}</h3>
            <h4>{movie.release_date}</h4>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
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
      if (this.state.movieName.length > 0) {
        this.props.searchMovies(this.state.movieName)
      }
    })
  }

  selectMovie(id, title, releaseDate) {
    this.setState({
      movieName: title,
      releaseDate: releaseDate 
    }, () => {
      this.props.selectMovie(id)
    })

  }
}

MovieForm.propTypes = {
  searchMovies: PropTypes.func,
  selectMovie: PropTypes.func,
}

const mapStateToProps = state => ({
  member: state.member.data.author,
  searchingMovies: state.tmdb.isFetching,
  movieSearch: state.tmdb.data
})

export default connect(mapStateToProps, { searchMovies, selectMovie })(MovieForm)
