import React, { Component } from 'react'

class Home extends Component {
  _handleClick = () => {
    window.alert('OK')
  };

  render = () => {
    return (
      <div>
        <h1>Home page</h1>
        <button onClick={this._handleClick}>Click me</button>
      </div>
    )
  };
}

export default Home
