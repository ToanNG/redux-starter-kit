import matchPattern from 'lib/matchPattern'

const App = require('containers/App')
const loadHome = cb => require.ensure([], require => cb(require('containers/Home')), 'Home')
const loadLogin = cb => require.ensure([], require => cb(require('containers/Login')), 'Login')
const loadPost = cb => require.ensure([], require => cb(require('containers/Post')), 'Post')
const loadAbout = cb => require.ensure([], require => cb(require('containers/About')), 'About')
const childRoutes = [
  { loadComponent: loadLogin, path: '/login' },
  { loadComponent: loadPost, path: '/posts/:postId' },
  { loadComponent: loadAbout, path: '/about' }
]

export default {
  path: '/',
  component: App,
  getChildRoutes (location, cb) {
    childRoutes.forEach(route => {
      const { loadComponent, path: pattern } = route

      if (matchPattern(pattern, location.pathname)) {
        loadComponent(Component => {
          cb(null, { component: Component, path: pattern })
        })
      }
    })
  },
  getIndexRoute (location, cb) {
    loadHome((Home) => {
      cb(null, { component: Home })
    })
  }
}
