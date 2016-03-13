import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Post from './containers/Post'
import About from './containers/About'

export default (
  <Route name='app' component={App} path='/'>
    <IndexRoute component={Home} />
    <Route name='login' component={Login} path='/login' />
    <Route name='post' component={Post} path='/posts/:postId' />
    <Route name='about' component={About} path='/about' />
  </Route>
)
