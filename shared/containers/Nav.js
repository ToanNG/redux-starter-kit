import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Menu from 'material-ui/lib/menus/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import LeftNav from 'material-ui/lib/left-nav'

@connect(
  null,
  dispatch => ({
    push: bindActionCreators(push, dispatch)
  })
)
class Nav extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onRequestChange: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  _handleRequestChange = (open) => {
    const { onRequestChange } = this.props
    onRequestChange(open)
  };

  _handleMenuChange = (e, path) => {
    const { push, onRequestChange } = this.props
    push(path)
    onRequestChange(false)
  };

  render () {
    return (
      <LeftNav
        docked={false}
        width={200}
        open={this.props.open}
        onRequestChange={this._handleRequestChange}
      >
        <Menu onChange={this._handleMenuChange} zDepth={0}>
          <MenuItem value='/'>Home</MenuItem>
          <MenuItem value='/about'>About</MenuItem>
        </Menu>
      </LeftNav>
    )
  }
}

export default Nav
