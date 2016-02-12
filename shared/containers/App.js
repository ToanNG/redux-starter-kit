import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class App extends Component {
  static propTypes = {
    children: PropTypes.object
  };
  static childContextTypes = {
    isInit: PropTypes.bool
  };
  state = {
    isInit: true
  };

  getChildContext () {
    return {
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
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
