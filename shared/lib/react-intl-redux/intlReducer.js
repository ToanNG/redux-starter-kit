const INITIAL_STATE = {
  locale: 'en',
  messages: {}
}

export function intlReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SWITCH_LOCALE':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
