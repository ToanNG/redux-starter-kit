import fetch from 'isomorphic-fetch'

export function getPosts () {
  return {
    types: ['GET_POSTS', 'GET_POSTS_SUCCESS', 'GET_POSTS_FAILURE'],
    promise: fetch('http://localhost:3000/data.json')
    // promise: fetch('http://jsonplaceholder.typicode.com/posts?userId=1')
  }
}
