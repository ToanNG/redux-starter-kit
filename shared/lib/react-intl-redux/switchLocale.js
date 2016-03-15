import fetch from 'isomorphic-fetch'

export function switchLocale ({ locale, dataUrl }) {
  return dispatch => {
    return fetch(dataUrl)
      .then(response => response.json())
      .then(messages => dispatch({
        type: 'SWITCH_LOCALE',
        payload: { locale, messages }
      }))
  }
}
