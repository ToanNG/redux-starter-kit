import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { match, Router, browserHistory } from 'react-router'
import { IntlProvider } from 'lib/react-intl-redux'
import configureStore from 'store/configureStore'
import immutifyState from 'lib/immutifyState'
import routes from './routes'
import 'app.css'

// import all files in images folder
require.context('../images', false, /^.*$/)

// expose perf tool
import 'react-addons-perf'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// the router reducer (name "routing") is not an immutable obj
const initialState = immutifyState({
  obj: window.__INITIAL_STATE__,
  exclude: ['routing', 'intl']
})
const store = configureStore(initialState)

match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider>
        <Router routes={routes} history={browserHistory} />
      </IntlProvider>
    </Provider>,
    document.getElementById('react-root')
  )
})

// register service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/javascripts/serviceWorker.js', {
//     scope: '/'
//   })
// }
