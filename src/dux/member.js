import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT = 'LOGOUT'

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
      return false
    default:
      return state
  }
}

const data = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload
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