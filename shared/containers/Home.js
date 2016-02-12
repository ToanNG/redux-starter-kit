import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import * as PostActions from '../actions/post'

@connect(
  state => ({ post: state.post }),
  dispatch => ({
    actions: bindActionCreators(PostActions, dispatch),
    router: bindActionCreators(routeActions, dispatch)
  })
)
class Home extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  static contextTypes = {
    isInit: PropTypes.bool
  };

  static needs = [
    PostActions.getPosts
  ];

  componentDidMount () {
    if (!this.context.isInit) {
      this.props.actions.getPosts()
    }
  }

  _handleClick = (id) => {
    this.props.router.push(`/posts/${id}`)
  };

  render = () => {
    const { post } = this.props

    return (
      <div>
        <h1>Home page</h1>
        <ul>
          {post.get('posts').map(p =>
            <li key={p.get('id')} onClick={this._handleClick.bind(null, p.get('id'))}>
              {p.get('title')}
            </li>
          )}
        </ul>
      </div>
    )
  };
}

export default Home
