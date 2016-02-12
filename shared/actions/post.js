import fetch from 'isomorphic-fetch'

export function getPosts () {
  return {
    types: ['GET_POSTS', 'GET_POSTS_SUCCESS', 'GET_POSTS_FAILURE'],
    promise: fetch('http://jsonplaceholder.typicode.com/posts?userId=1')
  }
}

export function getOnePost ({ postId }) {
  return {
    types: ['GET_ONE_POST', 'GET_ONE_POST_SUCCESS', 'GET_ONE_POST_FAILURE'],
    promise: fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`)
  }
}
