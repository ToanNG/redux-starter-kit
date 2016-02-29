import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup'

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
