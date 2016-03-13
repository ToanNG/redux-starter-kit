import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/user'
import RaisedButton from 'material-ui/lib/raised-button'

@connect(
  null,
  dispatch => ({ userActions: bindActionCreators(UserActions, dispatch) })
)
class Login extends Component {
  static propTypes = {
    userActions: PropTypes.object.isRequired
  };

  _handleTouchTapLogin = () => {
    this.props.userActions.login()
  };

  render () {
    return (
      <div className='page'>
        <RaisedButton label='Login' primary onTouchTap={this._handleTouchTapLogin} />
      </div>
    )
  }
}

export default Login
