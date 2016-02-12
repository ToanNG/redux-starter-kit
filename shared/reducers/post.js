import { Map, List } from 'immutable'
import process from '../lib/processData'

const INITIAL_STATE = Map({
  isLoading: false,
  posts: List(),
  selectedPost: Map()
})

const postMapper = {
  id: 'id',
  title: 'title',
  body: data => data.body.replace(/\n/g, '\\n')
}

export default function postReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_POSTS':
      return state.merge({
        isLoading: true
      })

    case 'GET_POSTS_SUCCESS':
      return state.merge({
        isLoading: false,
        posts: action.result.map(post => process(post, postMapper))
      })

    case 'GET_POSTS_FAILURE':
      return state.merge({
        isLoading: false
      })

    case 'GET_ONE_POST':
      return state.merge({
        isLoading: true,
        selectedPost: null
      })

    case 'GET_ONE_POST_SUCCESS':
      return state.merge({
        isLoading: false,
        selectedPost: process(action.result, postMapper)
      })

    default:
      return state
  }
}
