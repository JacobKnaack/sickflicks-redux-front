import { combineReducers } from 'redux'
import news from './news'
import member from './member'
import movies from './movies'
import reviews from './reviews'
import tmdb from './tmdb'

import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  news,
  member,
  reviews,
  movies,
  tmdb,
  router: routerReducer,
})

export default rootReducer