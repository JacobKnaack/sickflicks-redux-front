import React from 'react'
import { connect } from 'react-redux'

import MovieReviewItem from '../MovieReviewItem'
import { fetchReviews } from '../../../dux/reviews'

class ReviewList extends React.Component {
  render() {
    return (
      <div className='movieList'>
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
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movies.data,
})

export default connect(mapStateToProps, null)(ReviewList)
