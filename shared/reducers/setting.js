import { Map } from 'immutable'

const INITIAL_STATE = Map({
  remoteUrl: null
})

export default function settingReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_SETTINGS_SUCCESS':
      return state.merge(action.result)

    default:
      return state
  }
}
