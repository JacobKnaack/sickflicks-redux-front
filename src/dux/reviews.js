import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'

export const POST_REVIEW_REQUEST = 'POST_REVIEW_REQUEST'
export const POST_REVIEW_SUCCESS = 'POST_REVIEW_SUCCESS'
export const POST_REVIEW_FAILURE = 'POST_REVIEW_FAILURE'

export const postReview = (movieId, title, author, html) => (getState, dispatch) => {
  const accessToken = getState().member.accessToken

  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL}/review`,
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
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
      return true
    case POST_REVIEW_SUCCESS:
    case POST_REVIEW_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case POST_REVIEW_FAILURE:
      return action.payload || { message: action.payload.message }
    case POST_REVIEW_REQUEST:
    case POST_REVIEW_SUCCESS:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case POST_REVIEW_SUCCESS:
      return [...state, action.payload]
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