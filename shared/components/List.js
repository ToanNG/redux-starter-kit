import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'

class ListComponent extends Component {
  static propTypes = {
    dataSource: PropTypes.instanceOf(List).isRequired,
    onClickItem: PropTypes.func
  };

  _handleClick = id => {
    var { onClickItem } = this.props
    onClickItem && onClickItem(id)
  };

  render = () => {
    var { dataSource } = this.props
    return (
      <ul>
        {dataSource.map((item, key) =>
          <li key={key} onClick={this._handleClick.bind(null, item.get('id'))}>
            {item.get('title')}
          </li>
        )}
      </ul>
    )
  };
}

export default ListComponent
