let localeData = {}
let initialState = {
  locale: 'en',
  messages: {}
}

export function intlReducer (state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_LOCALE':
      const locale = action.payload.locale
      return {
        locale,
        messages: localeData[locale].messages
      }

    default:
      return state
  }
}

export function loadLocaleData (data, defaultLocale = 'en') {
  localeData = data
  initialState = data[defaultLocale]
}
