import React, { Component, PropTypes } from 'react'

class List extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
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
          <li key={key} onClick={this._handleClick.bind(null, item.id)}>
            {item.title}
          </li>
        )}
      </ul>
    )
  };
}

export default List
