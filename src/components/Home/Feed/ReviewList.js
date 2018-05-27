import React from 'react'
import { connect } from 'react-redux'

import MovieReviewItem from '../MovieReviewItem'
import { fetchReviews } from '../../../dux/reviews'

class ReviewList extends React.Component {

  componentDidMount() {
    this.props.fetchReviews()
  }

  render() {
    return (
      <div className='movieList'>
        {this.props.reviews.map(review => {
          let movieId, imgPath, movieName, release = ''
          for (const movie of this.props.movies) {
            if( movie._id === review.movieId ) {
              movieId   = movie._id
              imgPath   = movie.image_path
              movieName = movie.name
              release   = movie.release
            }
          }

          return (<MovieReviewItem
            key={review._id}
            movie_name={movieName}
            release={release}
            image_path={imgPath}
            review_id={review._id}
            title={review.title}
            author={review.author}
            created_on={review.created_on}
          />)
        })}
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
