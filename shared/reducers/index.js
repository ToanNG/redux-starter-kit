import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import post from './post'

const rootReducer = combineReducers({
  post,
  routing: routeReducer
})

export default rootReducer
