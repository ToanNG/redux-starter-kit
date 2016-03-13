import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { switchLocale } from '../lib/react-intl-redux'
import { Link } from 'react-router'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup'

import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import themeDecorator from 'material-ui/lib/styles/theme-decorator'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import LanguageIcon from 'material-ui/lib/svg-icons/action/language'
import MenuItem from 'material-ui/lib/menus/menu-item'

import { FormattedMessage } from 'react-intl'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

@themeDecorator(getMuiTheme(null, {
  userAgent: 'all'
}))
@connect(
  state => ({ intl: state.intl }),
  dispatch => ({ switchLocale: bindActionCreators(switchLocale, dispatch) })
)
class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
    switchLocale: PropTypes.func
  };
  static childContextTypes = {
    location: PropTypes.object,
    isInit: PropTypes.bool
  };
  state = {
    isInit: true
  };

  getChildContext () {
    return {
      location: this.props.location,
      isInit: this.state.isInit
    }
  }

  componentWillReceiveProps () {
    this.setState({ isInit: false })
  }

  _handleTouchTap = (locale) => {
    this.props.switchLocale(locale)
  };

  render () {
    return (
      <div>
        <AppBar
          title={
            <FormattedMessage id='greeting' values={{ name: 'React' }} />
          }
          titleStyle={{ fontWeight: 300 }}
          iconElementRight={
            <IconMenu
              desktop
              iconButtonElement={
                <IconButton><LanguageIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                primaryText='English'
                onTouchTap={this._handleTouchTap.bind(null, 'en')}
              />
              <MenuItem
                primaryText='Vietnamese'
                onTouchTap={this._handleTouchTap.bind(null, 'vi')}
              />
            </IconMenu>
          }
        />
        <header>
          Links:
          {' '}
          <Link to='/'>Home</Link>
          {' '}
          <Link to='/about'>About</Link>
        </header>
        <RouteCSSTransitionGroup
          component='div' transitionName='page'
          transitionEnterTimeout={500} transitionLeaveTimeout={250}
        >
          {this.props.children}
        </RouteCSSTransitionGroup>
      </div>
    )
  }
}

export default App
