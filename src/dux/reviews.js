import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'
import { LOGOUT } from './member'

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST'
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS'
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE'

export const FETCH_REVIEW_REQUEST = "FETCH_REVIEW_REQUEST"
export const FETCH_REVIEW_SUCCESS = "FETCH_REVIEW_SUCCESS"
export const FETCH_REVIEW_FAILURE = "FETCH_REVIEW_FAILURE"

export const FETCH_REVIEWS_BY_MOVIE_ID_REQUEST = 'FETCH_REVIEWS_BY_MOVIE_ID_REQUEST'
export const FETCH_REVIEWS_BY_MOVIE_ID_SUCCESS = 'FETCH_REVIEWS_BY_MOVIE_ID_SUCCESS'
export const FETCH_REVIEWS_BY_MOVIE_ID_FAILURE = 'FETCH_REVIEWS_BY_MOVIE_ID_FAILURE'

export const FETCH_REVIEWS_BY_AUTHOR_REQUEST = 'FETCH_REVIEWS_BY_AUTHOR_REQUEST'
export const FETCH_REVIEWS_BY_AUTHOR_SUCCESS = 'FETCH_REVIEWS_BY_AUTHOR_SUCCESS'
export const FETCH_REVIEWS_BY_AUTHOR_FAILURE = 'FETCH_REVIEWS_BY_AUTHOR_FAILURE'

export const POST_REVIEW_REQUEST = 'POST_REVIEW_REQUEST'
export const POST_REVIEW_SUCCESS = 'POST_REVIEW_SUCCESS'
export const POST_REVIEW_FAILURE = 'POST_REVIEW_FAILURE'

export const UPDATE_REVIEW_REQUEST = 'UPDATE_REVIEW_REQUEST'
export const UPDATE_REVIEW_SUCCESS = 'UPDATE_REVIEW_SUCCESS'
export const UPDATE_REVIEW_FAILURE = 'UPDATE_REVIEW_FAILURE'

export const REMOVE_REVIEWS = 'REMOVE_REVIEWS'

export const fetchReviews = () => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/reviews`,
      method: 'GET',
      types: [
        FETCH_REVIEWS_REQUEST,
        FETCH_REVIEWS_SUCCESS,
        FETCH_REVIEWS_FAILURE,
      ]
    }
  })
}

export const loadReview = (reviewId) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/review/${reviewId}`,
      method: 'GET',
      types: [
        FETCH_REVIEW_REQUEST,
        FETCH_REVIEW_SUCCESS,
        FETCH_REVIEW_FAILURE,
      ]
    }
  })
}

export const fetchReviewsByMovieId = (movieId) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/reviews/${movieId}`,
      method: 'GET',
      types: [
        FETCH_REVIEWS_BY_MOVIE_ID_REQUEST,
        FETCH_REVIEWS_BY_MOVIE_ID_SUCCESS,
        FETCH_REVIEWS_BY_MOVIE_ID_FAILURE,
      ]
    }
  })
}

export const fetchReviewsByAuthor = (name) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/reviews/by/${name}`,
      method: 'GET',
      types: [
        FETCH_REVIEWS_BY_AUTHOR_REQUEST,
        FETCH_REVIEWS_BY_AUTHOR_SUCCESS,
        FETCH_REVIEWS_BY_AUTHOR_FAILURE,
      ]
    }
  })
}

export const addReview = (accessToken, movieId, title, author, html) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/review`,
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: movieId,
        title: title,
        user: author,
        html: html,
      }),
      types: [
        POST_REVIEW_REQUEST,
        POST_REVIEW_SUCCESS,
        POST_REVIEW_FAILURE,
      ],
    },
  })
}

export const updateReview = (accessToken, reviewId, html) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL}/review/${reviewId}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: html
      }),
      types: [
        UPDATE_REVIEW_REQUEST,
        UPDATE_REVIEW_SUCCESS,
        UPDATE_REVIEW_FAILURE,
      ],
    },
  })
}

export const removeReviewData = () => (dispatch) => {
  dispatch({
    type: REMOVE_REVIEWS
  })
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case POST_REVIEW_REQUEST:
    case FETCH_REVIEWS_REQUEST:
    case FETCH_REVIEW_REQUEST:
    case FETCH_REVIEWS_BY_MOVIE_ID_REQUEST:
    case FETCH_REVIEWS_BY_AUTHOR_REQUEST:
    case UPDATE_REVIEW_REQUEST:
      return true
    case POST_REVIEW_SUCCESS:
    case POST_REVIEW_FAILURE:
    case FETCH_REVIEWS_SUCCESS:
    case FETCH_REVIEWS_FAILURE:
    case FETCH_REVIEW_SUCCESS:
    case FETCH_REVIEW_FAILURE:
    case FETCH_REVIEWS_BY_MOVIE_ID_SUCCESS:
    case FETCH_REVIEWS_BY_MOVIE_ID_FAILURE:
    case FETCH_REVIEWS_BY_AUTHOR_SUCCESS:
    case FETCH_REVIEWS_BY_AUTHOR_FAILURE:
    case UPDATE_REVIEW_SUCCESS:
    case UPDATE_REVIEW_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case POST_REVIEW_FAILURE:
    case FETCH_REVIEWS_FAILURE:
    case FETCH_REVIEW_FAILURE:
    case FETCH_REVIEWS_BY_MOVIE_ID_FAILURE:
    case FETCH_REVIEWS_BY_AUTHOR_FAILURE:
    case UPDATE_REVIEW_FAILURE:
      return action.payload || { message: action.payload.message }
    case POST_REVIEW_REQUEST:
    case POST_REVIEW_SUCCESS:
    case FETCH_REVIEWS_REQUEST:
    case FETCH_REVIEWS_SUCCESS:
    case FETCH_REVIEW_REQUEST:
    case FETCH_REVIEW_SUCCESS:
    case FETCH_REVIEWS_BY_MOVIE_ID_REQUEST:
    case FETCH_REVIEWS_BY_MOVIE_ID_SUCCESS:
    case FETCH_REVIEWS_BY_AUTHOR_REQUEST:
    case FETCH_REVIEWS_BY_AUTHOR_SUCCESS:
    case UPDATE_REVIEW_REQUEST:
    case UPDATE_REVIEW_SUCCESS:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case POST_REVIEW_SUCCESS:
    case UPDATE_REVIEW_SUCCESS:
      return [...state, action.payload]
    case FETCH_REVIEWS_SUCCESS:
    case FETCH_REVIEWS_BY_MOVIE_ID_SUCCESS:
    case FETCH_REVIEWS_BY_AUTHOR_SUCCESS:
      return [...action.payload]
    case FETCH_REVIEW_SUCCESS:
      return [action.payload]
    case REMOVE_REVIEWS:
      return []
    default:
      return state
  }
}

const reviews = combineReducers({
  isFetching,
  error,
  data,
})

export default reviews