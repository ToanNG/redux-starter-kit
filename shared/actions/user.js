import { routeActions } from 'react-router-redux'

export function login () {
  return dispatch => {
    setTimeout(() => {
      dispatch(routeActions.push('/'))
    }, 3000)
  }
}
