export function switchLocale (locale) {
  return {
    type: 'SWITCH_LOCALE',
    payload: { locale }
  }
}
