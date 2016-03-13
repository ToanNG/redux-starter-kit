import { addLocaleData } from 'react-intl'
import vi from 'react-intl/locale-data/vi'

addLocaleData(vi)

export default {
  locale: 'vi',
  messages: {
    greeting: 'Xin chào, {name}'
  }
}
