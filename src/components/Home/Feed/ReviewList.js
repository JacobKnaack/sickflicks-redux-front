import React from 'react'
import { connect } from 'react-redux'

import MovieReviewItem from '../MovieReviewItem'
import * as util from '../../../lib/util'

class ReviewList extends React.Component {
  render() {
    const movies = this.props.movies.sort((a,b) => {
      return new Date(b.created_on) - new Date(a.created_on)
    })

    return (
      <div className='movieList'>
        {util.renderEither(!this.props.movies.length && !this.props.loadingMovies,
          <div className='initMovies'>
            <i className="fas fa-exclamation-triangle"></i>
            <h2>Looks like we are migrating to our new Database.</h2>
            <p>Please come back later</p>
          </div>,
          <div>
            {movies.map(movie => {
              return (<MovieReviewItem
                key={movie._id}
                movie_id={movie._id}
                movie_name={movie.name}
                image_path={movie.image_path}
                release={movie.release}
                created_on={movie.created_on}
              />)
            })}
          </div>
        )}
        {util.renderIf(this.props.loadingMovies,
          <div className='movieLoad'>
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loadingMovies: state.movies.isFetching,
  movies: state.movies.data,
})

export default connect(mapStateToProps, null)(ReviewList)
