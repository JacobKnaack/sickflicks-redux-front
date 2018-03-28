import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST'
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS'
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE'

export const ADD_MOVIE_REQUEST = 'ADD_MOVIE_REQUEST'
export const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS'
export const ADD_MOVIE_FAILURE = 'ADD_MOVIE_FAILURE'

export const fetchMovies = () => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/movies`,
      method: "GET",
      types: [
        FETCH_MOVIE_REQUEST,
        FETCH_MOVIE_SUCCESS,
        FETCH_MOVIE_FAILURE,
      ],
    },
  })
}

export const addMovie = (name, release) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL}/movies`,
      method: "POST",
      types: [
        ADD_MOVIE_REQUEST,
        ADD_MOVIE_SUCCESS,
        ADD_MOVIE_FAILURE,
      ],
    },
  })
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_MOVIE_REQUEST:
      return true
    case FETCH_MOVIE_SUCCESS:
    case FETCH_MOVIE_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case FETCH_MOVIE_FAILURE:
    case ADD_MOVIE_FAILURE:
      return action.payload || { message: action.payload.message }
    case FETCH_MOVIE_REQUEST:
    case FETCH_MOVIE_SUCCESS:
    case ADD_MOVIE_REQUEST:
    case ADD_MOVIE_SUCCESS:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIE_SUCCESS:
      return [...action.payload]
    case ADD_MOVIE_SUCCESS:
      return [...state, action.payload]
    default:
      return state
  }
}

const movies = combineReducers({
  isFetching,
  error,
  data,
})

export default movies