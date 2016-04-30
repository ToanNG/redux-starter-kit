import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { switchLocale } from '../lib/react-intl-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import LanguageIcon from 'material-ui/lib/svg-icons/action/language'
import MenuItem from 'material-ui/lib/menus/menu-item'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

@connect(
  null,
  dispatch => ({
    switchLocale: bindActionCreators(switchLocale, dispatch)
  })
)
class Header extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    switchLocale: PropTypes.func.isRequired,
    onMenuIconTouchTap: PropTypes.func
  };

  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  statics = {
    titleStyle: { fontWeight: 300 },
    menuOrigin: { horizontal: 'right', vertical: 'top' }
  };

  _handleTouchTapLeftIconButton = () => {
    const { onMenuIconTouchTap } = this.props
    onMenuIconTouchTap && onMenuIconTouchTap()
  };

  _handleMenuChange = (e, locale) => this.props.switchLocale({
    locale,
    dataUrl: `http://localhost:3000/locale-data/${locale}.json`
  });

  _getCachedMenu = () => {
    if (!this._cachedMenu) {
      this._cachedMenu = (
        <IconMenu
          desktop
          iconButtonElement={<IconButton><LanguageIcon /></IconButton>}
          targetOrigin={this.statics.menuOrigin}
          anchorOrigin={this.statics.menuOrigin}
          onChange={this._handleMenuChange}
        >
          <MenuItem primaryText='English' value='en' />
          <MenuItem primaryText='Tiếng Việt' value='vi' />
        </IconMenu>
      )
    }
    return this._cachedMenu
  };

  render () {
    return (
      <AppBar
        title={<FormattedMessage id='greeting' values={{ name: 'React' }} />}
        titleStyle={this.statics.titleStyle}
        iconElementRight={this._getCachedMenu()}
        onLeftIconButtonTouchTap={this._handleTouchTapLeftIconButton}
      />
    )
  }
}

export default injectIntl(Header)
