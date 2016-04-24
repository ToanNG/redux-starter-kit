import fetch from 'isomorphic-fetch'

export function getSettings () {
  return {
    types: ['GET_SETTINGS', 'GET_SETTINGS_SUCCESS', 'GET_SETTINGS_FAILURE'],
    promise: fetch('https://redux-starter-kit.herokuapp.com/settings.json')
  }
}
