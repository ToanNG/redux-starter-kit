import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { syncHistory } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import promise from '../middlewares/promise'
import dataloader from '../middlewares/dataloader'
import enablePerfTool from '../middlewares/perf'

export default function configureStore (initialState) {
  const middlewares = [thunk, dataloader, promise]

  if (__CLIENT__) {
    middlewares.push(syncHistory(browserHistory))
  } else {
    middlewares.push(syncHistory(createMemoryHistory()))
  }

  if (__DEV__) {
    middlewares.push(createLogger())
  }

  if (__PERF__) {
    middlewares.push(enablePerfTool())
  }

  const finalCreateStore = applyMiddleware(...middlewares)(createStore)
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
