import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Home from 'containers/Home'
import configureStore from 'store/configureStore'
import immutifyState from 'lib/immutifyState'
import 'app.css'

const initialState = immutifyState(window.__INITIAL_STATE__)
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('react-root')
)
