import React from 'react'
import { connect } from 'react-redux'
import { fetchMovies } from '../../dux/movies'

class MovieList extends React.Component {

  componentDidMount() {
    this.props.fetchMovies()
  }

  render() {
    return (
      <div className='movieList'>
        <h2 className='movieListTitle'>Featured Reviews</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movies.data,
})

export default connect(mapStateToProps, { fetchMovies })(MovieList)
