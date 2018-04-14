import React from 'react'
import PropTypes from 'prop-types'

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
          <h2>A Sick Flicks Review: {this.props.name}</h2>
          <h3>{this.props.release}</h3>
        </div>
      </div>
    )
  }
}

MovieReviewItem.propTypes = {
  name: PropTypes.string,
  release: PropTypes.string,
  image_path: PropTypes.string,
}

export default MovieReviewItem