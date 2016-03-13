import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import post from './post'
import { intlReducer, loadLocaleData } from '../lib/react-intl-redux'
import localeData from '../locale-data'

// load locale data and set default locale to "vi"
loadLocaleData(localeData, 'vi')

const rootReducer = combineReducers({
  post,
  intl: intlReducer,
  routing: routeReducer
})

export default rootReducer
