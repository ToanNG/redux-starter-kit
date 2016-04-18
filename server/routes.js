import App from '../shared/containers/App'
import Home from '../shared/containers/Home'
import Login from '../shared/containers/Login'
import Post from '../shared/containers/Post'
import About from '../shared/containers/About'

const indexRoute = { component: Home }
const childRoutes = [
  { component: Login, path: '/login' },
  { component: Post, path: '/posts/:postId' },
  { component: About, path: '/about' }
]

export default {
  path: '/',
  component: App,
  childRoutes,
  indexRoute
}
