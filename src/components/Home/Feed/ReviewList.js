import React from 'react'
import { connect } from 'react-redux'

import MovieReviewItem from '../MovieReviewItem'
import { fetchReviews } from '../../../dux/reviews'

class ReviewList extends React.Component {

  componentDidMount() {
    // console.log(this.props)
    this.props.fetchReviews()
  }

  render() {
    return (
      <div className='movieList'>
        {this.props.movies.map(movie => 
          <MovieReviewItem
            key={movie._id}
            name={movie.name}
            release={movie.release}
            image_path={movie.image_path}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movies.data,
  reviews: state.reviews.data,
})

const mapDispatchToProps = {
  fetchReviews,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList)
