import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup'

import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import themeDecorator from 'material-ui/lib/styles/theme-decorator'
import AppBar from 'material-ui/lib/app-bar'
import RaisedButton from 'material-ui/lib/raised-button'

import { FormattedMessage } from 'react-intl'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

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

  render () {
    return (
      <div>
        <AppBar
          title='Title'
          titleStyle={{ fontWeight: 300 }}
        />
        <header>
          Links:
          {' '}
          <Link to='/'>Home</Link>
          {' '}
          <Link to='/about'>About</Link>
        </header>
        <FormattedMessage id='greeting' values={{ name: 'Toan' }} />
        <RaisedButton label='Primary' primary />
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
