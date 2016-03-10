import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

export default connect(state => {
  const { locale, messages } = state.intl
  return {
    locale,
    messages
  }
})(IntlProvider)
