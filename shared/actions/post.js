import fetch from 'isomorphic-fetch'
import { getSettings } from './setting'

export function getPosts () {
  return {
    dataloader: getSettings,
    data: state => state.setting.get('remoteUrl'),
    action: data => ({
      types: ['GET_POSTS', 'GET_POSTS_SUCCESS', 'GET_POSTS_FAILURE'],
      promise: fetch(`${data}/posts?userId=1`)
    })
  }
}

export function getOnePost ({ postId }) {
  return {
    dataloader: () => dispatch => {
      dispatch({ type: 'GET_SETTINGS' })
      return fetch('https://redux-starter-kit.herokuapp.com/settings.json')
        .then(response => response.json())
        .then(result => dispatch({ type: 'GET_SETTINGS_SUCCESS', result }))
    },
    data: state => state.setting.get('remoteUrl'),
    action: data => dispatch => {
      dispatch({ type: 'GET_ONE_POST' })
      return fetch(`${data}/posts/${postId}`)
        .then(response => response.json())
        .then(result => dispatch({ type: 'GET_ONE_POST_SUCCESS', result }))
    }
  }
}
