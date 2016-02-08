import { Map, List } from 'immutable'

const INITIAL_STATE = Map({
  isLoading: false,
  posts: List()
})

export default function postReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_POSTS':
      return state.merge({
        isLoading: true
      })

    case 'GET_POSTS_SUCCESS':
      return state.merge({
        isLoading: false,
        posts: action.result
      })

    case 'GET_POSTS_FAILURE':
      return state.merge({
        isLoading: false
      })

    default:
      return state
  }
}
