import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'

const { store } = configureStore()

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

registerServiceWorker()
