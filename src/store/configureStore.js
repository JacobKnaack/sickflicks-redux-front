import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { apiMiddleware } from 'redux-api-middleware'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../dux'

export const history = createHistory()
const routerMiddlewareInstance = routerMiddleware(history)
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
  thunk,
  apiMiddleware,
  routerMiddlewareInstance,
]

const configureStore = state => {
  const store =  createStore(
    // rootReducer,
    persistedReducer,
    state,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  const persistor = persistStore(store)

  if(module.hot) {
    module.hot.accept('../dux/', () => {
      const nextRootReducer = require('../dux/').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor }
}

export default configureStore