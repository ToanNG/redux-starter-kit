import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Home from 'containers/Home'
import configureStore from 'store/configureStore'
import 'app.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('react-root')
)
