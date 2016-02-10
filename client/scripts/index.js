import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from 'store/configureStore'
import immutifyState from 'lib/immutifyState'
import routes from 'routes'
import 'app.css'

const initialState = immutifyState({
  obj: window.__INITIAL_STATE__,
  exclude: ['routing']
})
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('react-root')
)
