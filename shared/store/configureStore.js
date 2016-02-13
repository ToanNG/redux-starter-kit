import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { syncHistory } from 'react-router-redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import promise from '../middlewares/promise'

export default function configureStore (initialState) {
  const middlewares = [promise]

  if (__CLIENT__) {
    middlewares.push(syncHistory(browserHistory))
  } else {
    middlewares.push(syncHistory(createMemoryHistory()))
  }

  if (__DEV__) {
    middlewares.push(createLogger())
  }

  const finalCreateStore = applyMiddleware(...middlewares)(createStore)
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
