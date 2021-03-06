import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT = 'LOGOUT'

export const AUTH_ERROR_SEEN = 'AUTH_ERROR_SEEN'

export const login = (username, password) => (dispatch) => {
  const encoded = new Buffer(`${username}:${password}`).toString('base64')

  dispatch({
    [CALL_API]: {
      endpoint: `${__DB_API_URL__}/login`,
      method: 'GET',
      headers: {
        'Authorization': `Basic ${encoded}`
      },
      types: [
        LOGIN_REQUEST,
        LOGIN_SUCCESS,
        LOGIN_FAILURE,
      ]
    }
  })
}

export const logout = () => (dispatch) => {
  dispatch({ 
      type: LOGOUT
   })
}

export const errorSeen = () => (dispatch) => {
  dispatch({
    type: AUTH_ERROR_SEEN
  })
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return action.payload || { message: action.payload.message }
    case LOGIN_REQUEST:
    case LOGIN_SUCCESS:
    case AUTH_ERROR_SEEN:
      return false
    default:
      return state
  }
}

const data = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload
    case LOGOUT: 
      return {}
    default:
      return state
  }
}

const member = combineReducers({
  isFetching,
  error,
  data,
})

export default member