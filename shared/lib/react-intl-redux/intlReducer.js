let initialState = {
  locale: 'en',
  messages: {}
}

export function intlReducer (state = initialState, action) {
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

export function loadLocaleData (data, defaultLocale = 'en') {
  initialState = data[defaultLocale]
}
