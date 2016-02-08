import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import promise from '../middlewares/promise'

export default function configureStore (initialState) {
  const finalCreateStore = compose(
    applyMiddleware(promise),
  )(createStore)
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
