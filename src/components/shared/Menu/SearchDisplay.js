import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'

import { renderEither, formatReviewDate } from '../../../lib/util'

const SearchDisplay = ({ movies }) => {
  const Styles = {
    container: {
      position: 'absolute',
      zIndex: '104',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '150px',
      maxHeight: '550px',
      marginTop: '27px',
      backgroundColor: '#ffffff',
      width: '350px',
      borderRadius: '0 0 5px 5px',
      overflowY: 'auto',
    },

    searchingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    searchResults: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    resultDisplay: {
      width: '90%',
      minHeight: '100px',
      padding: '5px',
      display: 'flex',
      flexDirection: 'row',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      borderRadius: '5px',
      backgroundColor: '#d3d3d3',
      margin: '5px 0',
      transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
      color: '#343C78',
      textDecoration: 'none',
    },

    resultInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItem: 'center',
      margin: '3px',
    },

    resultImage: {
      width: '75px',
      maxHeight: '100px',
    }
  }

  return (
    <div
      className="searchDisplay-container"
      style={Styles.container}
    >
      {renderEither(movies.length,
        <div id="searchResults" style={Styles.searchResults}>
          {movies.map(movie => {
            return (
              <Link
                key={movie._id}
                className="result-display"
                to={`/flick/${movie._id}`}
                style={Styles.resultDisplay}
              >
                <img className="result-image" src={movie.image_path} style={Styles.resultImage} />
                <div className="result-info" style={Styles.resultInfo}>
                  <h3 className="result-title">{movie.name}</h3>
                  <h4 className="result-creation">{formatReviewDate(movie.created_on)}</h4>
                </div>
              </Link>
            )
          })}
        </div>,
        <div style={Styles.searchingContainer} id="searching">
          <h4>No Movies found</h4>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

SearchDisplay.propTypes = {
  movies: PropTypes.array,
}

export default SearchDisplay
