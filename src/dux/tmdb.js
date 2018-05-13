import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'
import { LOGOUT } from './member'

export const SEARCH_MDB_REQUEST = 'SEARCH_MDB_REQUEST'
export const SEARCH_MDB_SUCCESS = 'SEARCH_MDB_SUCCESS'
export const SEARCH_MDB_FAILURE = 'SEARCH_MDB_FAILURE'

export const SELECT_MDB_MOVIE_REQUEST = 'SELECT_MDB_MOVIE_REQUEST'
export const SELECT_MDB_MOVIE_SUCCESS = 'SELECT_MDB_MOVIE_SUCCESS'
export const SELECT_MDB_MOVIE_FAILURE = 'SELECT_MDB_MOVIE_FAILURE'

export const RESET_MDB_DATA = 'RESET_MDB_DATA'

export const searchMovies = (movieQuery) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__MOVIEDB_API_URL__}/search/movie?api_key=${__MOVIEDB_API_KEY__}&query=${movieQuery}`,
      method: 'GET',
      types: [
        SEARCH_MDB_REQUEST,
        SEARCH_MDB_SUCCESS,
        SEARCH_MDB_FAILURE,
      ]
    }
  })
}

export const selectMovie = (movieId) => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__MOVIEDB_API_URL__}/movie/${movieId}?api_key=${__MOVIEDB_API_KEY__}&append_to_response=images`,
      method: 'GET',
      types: [
        SELECT_MDB_MOVIE_REQUEST,
        SELECT_MDB_MOVIE_SUCCESS,
        SELECT_MDB_MOVIE_FAILURE,
      ]
    }
  })
}

export const resetData = () => ({
  type: RESET_MDB_DATA,
})

const isFetching = (state = false, action) => {
  switch (action.type) {
    case SEARCH_MDB_REQUEST:
    case SELECT_MDB_MOVIE_REQUEST:
      return true
    case SEARCH_MDB_SUCCESS:
    case SEARCH_MDB_FAILURE:
    case SELECT_MDB_MOVIE_SUCCESS:
    case SELECT_MDB_MOVIE_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case SEARCH_MDB_FAILURE:
    case SELECT_MDB_MOVIE_FAILURE:
      return action.payload || { message: action.payload.message }
    case SEARCH_MDB_REQUEST:
    case SEARCH_MDB_SUCCESS:
    case SELECT_MDB_MOVIE_REQUEST:
    case SELECT_MDB_MOVIE_SUCCESS:
      return false
    default:
      return state
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case SEARCH_MDB_SUCCESS:
      return [...action.payload.results]
    case SELECT_MDB_MOVIE_SUCCESS:
      return action.payload
    case RESET_MDB_DATA:
    case LOGOUT:
      return []
    default:
      return state
  }
}

const tmdb = combineReducers({
  isFetching,
  error,
  data
})

export default tmdb