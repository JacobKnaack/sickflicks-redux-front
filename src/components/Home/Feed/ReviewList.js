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
        {this.props.reviews.map(review => {
          let imgPath, movieName, release = ''
          for (const index in this.props.movies) {
            if( this.props.movies[index]._id === review.movieId ) {
              imgPath   = this.props.movies[index].image_path
              movieName = this.props.movies[index].name
              release   = this.props.movies[index].release
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
