import fetch from 'isomorphic-fetch'

export function getPosts () {
  return {
    types: ['GET_POSTS', 'GET_POSTS_SUCCESS', 'GET_POSTS_FAILURE'],
    promise: fetch('/data.json')
    // promise: fetch('http://jsonplaceholder.typicode.com/posts')
  }
}
