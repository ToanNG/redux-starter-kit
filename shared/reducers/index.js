import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import post from './post'
import setting from './setting'
import { intlReducer } from '../lib/react-intl-redux'

const rootReducer = combineReducers({
  post,
  setting,
  intl: intlReducer,
  routing: routeReducer
})

export default rootReducer
