import matchPattern from 'lib/matchPattern'

const App = require('containers/App')
const Shell = require('containers/Shell')
const loadHome = require('bundle?lazy&name=Home!containers/Home')
const loadPost = require('bundle?lazy&name=Post!containers/Post')
const loadAbout = require('bundle?lazy&name=About!containers/About')
const loadLogin = require('bundle?lazy&name=Login!containers/Login')
const childRoutes = [
  { component: Shell, path: '/shell' },
  { loadComponent: loadLogin, path: '/login' },
  { loadComponent: loadPost, path: '/posts/:postId' },
  { loadComponent: loadAbout, path: '/about' }
]

export default {
  path: '/',
  component: App,
  getChildRoutes (location, cb) {
    const route = childRoutes.find(({ path }) => matchPattern(path, location.pathname))
    if (route) {
      const { component, loadComponent, path } = route
      if (typeof component !== 'undefined') {
        cb(null, route)
      } else {
        loadComponent(Component => cb(null, { component: Component, path }))
      }
    }
  },
  getIndexRoute (location, cb) {
    loadHome((Home) => {
      cb(null, { component: Home })
    })
  }
}
