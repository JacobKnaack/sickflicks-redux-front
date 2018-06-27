import React from 'react'
import { connect } from 'react-redux'

import MovieReviewItem from '../MovieReviewItem'
import * as util from '../../../lib/util'

class ReviewList extends React.Component {
  render() {
    return (
      <div className='movieList'>
        {util.renderEither(!this.props.movies.length && !this.props.loadingMovies,
          <div className='initMovies'>
            <i className="fas fa-exclamation-triangle"></i>
            <h2>Looks like we are migrating to our new Database.</h2>
            <p>Please come back later</p>
          </div>,
          <div>
            {this.props.movies.map(movie => {
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
          <h3>Loading movies</h3>
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
