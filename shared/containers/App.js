import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { switchLocale } from '../lib/react-intl-redux'
import { push } from 'react-router-redux'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup'

import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import themeDecorator from 'material-ui/lib/styles/theme-decorator'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import LanguageIcon from 'material-ui/lib/svg-icons/action/language'
import MenuItem from 'material-ui/lib/menus/menu-item'
import LeftNav from 'material-ui/lib/left-nav'

import { addLocaleData } from 'react-intl'
import vi from 'react-intl/locale-data/vi'

import { FormattedMessage } from 'react-intl'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

// add vietnamese data
addLocaleData(vi)

const setDefaultLocale = locale => target => {
  target.needs = [
    switchLocale.bind(null, {
      locale,
      dataUrl: `http://127.0.0.1:3000/locale-data/${locale}.json`
    })
  ]
}

// use this decorator after themeDecorator
// to fix the conflict on static property "needs"
@setDefaultLocale('vi')
@themeDecorator(getMuiTheme(null, {
  userAgent: 'all'
}))
@connect(
  state => ({ intl: state.intl }),
  dispatch => ({
    switchLocale: bindActionCreators(switchLocale, dispatch),
    push: bindActionCreators(push, dispatch)
  })
)
class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
    switchLocale: PropTypes.func,
    push: PropTypes.func
  };
  static childContextTypes = {
    location: PropTypes.object,
    isInit: PropTypes.bool
  };
  state = {
    isInit: true,
    openNav: false
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

  _handleTouchTapLanguage = locale => this.props.switchLocale({
    locale,
    dataUrl: `/locale-data/${locale}.json`
  });

  _handleTouchTapMenuIcon = () => this.setState({ openNav: !this.state.openNav });

  _handleTouchTapLink = (path) => {
    this.props.push(path)
    this.setState({ openNav: false })
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
                primaryText={
                  <FormattedMessage id='english' />
                }
                onTouchTap={this._handleTouchTapLanguage.bind(null, 'en')}
              />
              <MenuItem
                primaryText={
                  <FormattedMessage id='vietnamese' />
                }
                onTouchTap={this._handleTouchTapLanguage.bind(null, 'vi')}
              />
            </IconMenu>
          }
          onLeftIconButtonTouchTap={this._handleTouchTapMenuIcon}
        />
        <LeftNav
          docked={false}
          width={200}
          open={this.state.openNav}
          onRequestChange={openNav => this.setState({ openNav })}
        >
          <MenuItem onTouchTap={this._handleTouchTapLink.bind(null, '/')}>Home</MenuItem>
          <MenuItem onTouchTap={this._handleTouchTapLink.bind(null, '/about')}>About</MenuItem>
        </LeftNav>

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
