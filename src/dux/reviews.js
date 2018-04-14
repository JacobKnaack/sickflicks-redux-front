import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST'
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS'
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE'

export const POST_REVIEW_REQUEST = 'POST_REVIEW_REQUEST'
export const POST_REVIEW_SUCCESS = 'POST_REVIEW_SUCCESS'
export const POST_REVIEW_FAILURE = 'POST_REVIEW_FAILURE'

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
        author: author,
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

const isFetching = (state = false, action) => {
  switch (action.type) {
    case POST_REVIEW_REQUEST:
    case FETCH_REVIEWS_REQUEST:
      return true
    case POST_REVIEW_SUCCESS:
    case POST_REVIEW_FAILURE:
    case FETCH_REVIEWS_SUCCESS:
    case FETCH_REVIEWS_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case POST_REVIEW_FAILURE:
    case FETCH_REVIEWS_FAILURE:
      return action.payload || { message: action.payload.message }
    case POST_REVIEW_REQUEST:
    case POST_REVIEW_SUCCESS:
    case FETCH_REVIEWS_REQUEST:
    case FETCH_REVIEWS_SUCCESS:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case POST_REVIEW_SUCCESS:
      return [...state, action.payload]
    case FETCH_REVIEWS_SUCCESS:
      return [...action.payload]
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