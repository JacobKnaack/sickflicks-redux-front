import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { apiMiddleware } from 'redux-api-middleware'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../dux'

export const history = createHistory()
const routerMiddlewareInstance = routerMiddleware(history)

const middlewares = [
  thunk,
  apiMiddleware,
  routerMiddlewareInstance,
]

const configureStore = state => {
  const store =  createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  if(module.hot) {
    module.hot.accept('../dux/', () => {
      const nextRootReducer = require('../dux/').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore