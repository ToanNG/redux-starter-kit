import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import post from './post'
import { intlReducer } from '../lib/react-intl-redux'

const rootReducer = combineReducers({
  post,
  intl: intlReducer,
  routing: routeReducer
})

export default rootReducer
