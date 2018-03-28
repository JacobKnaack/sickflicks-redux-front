import { combineReducers } from 'redux'
import { CALL_API } from 'redux-api-middleware'

export const NEWS_REQUEST = 'NEWS_REQUEST'
export const NEWS_SUCCESS = 'NEWS_SUCCESS'
export const NEWS_FAILURE = 'NEWS_FAILURE'

export const fetchNews = () => (dispatch) => {
  dispatch({
    [CALL_API]: {
      endpoint: `${__NEWS_API_URL__}/top-headlines?country=us&category=entertainment`,
      method: "GET",
      headers: {
        "X-Api-Key": __NEWS_API_KEY__
      },
      types: [
        NEWS_REQUEST,
        NEWS_SUCCESS,
        NEWS_FAILURE,
      ],
    },
  })
}

export const isFetching = (state = false, action) => {
  switch(action.type) {
  case NEWS_REQUEST:
    return true
  case NEWS_SUCCESS:
  case NEWS_FAILURE:
    return false
  default:
    return state
  }
}

export const error = (state = null, action) => {
  switch (action.type) {
    case NEWS_FAILURE:
      return action.payload || {message: action.payload.message}
    case NEWS_REQUEST:
    case NEWS_SUCCESS:
      return false
    default:
      return state
  }
}

export const data = (state = [], action) => {
  switch(action.type) {
  case NEWS_SUCCESS:
    return [...action.payload.articles]
  default:
    return state
  }
}

const news = combineReducers({
  isFetching,
  error,
  data,
})

export default news
