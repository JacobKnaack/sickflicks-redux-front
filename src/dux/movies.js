import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'
import POST_REVIEW_SUCCESS from './reviews'

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST'
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS'
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE'

export const FETCH_MOVIE_BY_ID_REQUEST = 'FETCH_MOVIE_BY_ID_REQUEST'
export const FETCH_MOVIE_BY_ID_SUCCESS = 'FETCH_MOVIE_BY_ID_SUCCESS'
export const FETCH_MOVIE_BY_ID_FAILURE = 'FETCH_MOVIE_BY_ID_FAILURE'

export const ADD_MOVIE_REQUEST = 'ADD_MOVIE_REQUEST'
export const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS'
export const ADD_MOVIE_FAILURE = 'ADD_MOVIE_FAILURE'

export const fetchMovies = () => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/movies`,
      method: 'GET',
      types: [
        FETCH_MOVIE_REQUEST,
        FETCH_MOVIE_SUCCESS,
        FETCH_MOVIE_FAILURE,
      ],
    },
  })
}

export const fetchMovieById = (movieId) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/movie/${movieId}`,
      method: 'GET',
      types: [
        FETCH_MOVIE_BY_ID_REQUEST,
        FETCH_MOVIE_BY_ID_SUCCESS,
        FETCH_MOVIE_BY_ID_FAILURE,
      ]
    }
  })
}

export const addMovie = (name, release, imagePath, accessToken) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/movie`,
      method: 'POST'  ,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        release: release,
        image_path: imagePath,
      }),
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
    case ADD_MOVIE_REQUEST:
    case FETCH_MOVIE_BY_ID_REQUEST:
      return true
    case FETCH_MOVIE_SUCCESS:
    case FETCH_MOVIE_FAILURE:
    case FETCH_MOVIE_BY_ID_SUCCESS:
    case FETCH_MOVIE_BY_ID_FAILURE:
    case ADD_MOVIE_SUCCESS:
    case ADD_MOVIE_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case FETCH_MOVIE_FAILURE:
    case ADD_MOVIE_FAILURE:
    case FETCH_MOVIE_BY_ID_FAILURE:
      return action.payload || { message: action.payload.message }
    case FETCH_MOVIE_REQUEST:
    case FETCH_MOVIE_SUCCESS:
    case ADD_MOVIE_REQUEST:
    case ADD_MOVIE_SUCCESS:
    case FETCH_MOVIE_BY_ID_REQUEST:
    case FETCH_MOVIE_BY_ID_SUCCESS:
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

const reviewMovie = (state = {}, action) => {
  switch(action.type) {
    case ADD_MOVIE_SUCCESS:
    case FETCH_MOVIE_BY_ID_SUCCESS:
      return action.payload
    case POST_REVIEW_SUCCESS:
      return {}
    default:
      return state
  }
}

const movies = combineReducers({
  isFetching,
  error,
  data,
  reviewMovie,
})

export default movies