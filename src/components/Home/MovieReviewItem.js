import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class MovieReviewItem extends React.Component {
  render() {
    const styles = {
      container: {
        width: '95%',
        height: '300px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row'
      },
      image: {
        height: '100%',
        width: 'auto',
      }
    }

    return(
      <div className='movieReviewItem' style={styles.container}>
        <img
          src={this.props.image_path}
          alt={`${this.props.name} poster img`}
          style={styles.image}
        />
        <div className='itemInfo'>
          <h2>{this.props.movie_name} ({this.props.release}) A Sick Flicks Review:</h2>
          <h2>
            <Link to={`/flick/${this.props.review_id}`}>{this.props.title}</Link>
          </h2>
          <h3>{this.props.author}</h3>
          <h3>{this.props.created_on}</h3>
        </div>
      </div>
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