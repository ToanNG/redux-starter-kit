import React, { Component, PropTypes } from 'react'
import { switchLocale } from '../lib/react-intl-redux'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import themeDecorator from 'material-ui/lib/styles/theme-decorator'
import Header from './Header'
import Nav from './Nav'

import { addLocaleData } from 'react-intl'
import vi from 'react-intl/locale-data/vi'

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

@setDefaultLocale('vi')
@themeDecorator(getMuiTheme(null, {
  userAgent: 'all'
}))
class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object
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

  _handleTouchTapMenuIcon = () => this.setState({ openNav: !this.state.openNav });

  _handleNavRequestChange = openNav => this.setState({ openNav });

  render () {
    return (
      <div>
        <Header
          onMenuIconTouchTap={this._handleTouchTapMenuIcon}
        />

        <Nav
          open={this.state.openNav}
          onRequestChange={this._handleNavRequestChange}
        />

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
