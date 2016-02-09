var express = require('express')
var router = express.Router()

import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import Home from 'shared/containers/Home'
import configureStore from 'shared/store/configureStore'

import * as PostActions from 'shared/actions/post'

/* GET home page. */
router.get('/', function (req, res, next) {
  const store = configureStore()

  store.dispatch(PostActions.getPosts())
    .then(() => {
      const InitialView = (
        <Provider store={store}>
          <Home />
        </Provider>
      )
      const initialState = store.getState()

      res.render('index', {
        title: 'Express',
        html: ReactDOM.renderToString(InitialView),
        state: JSON.stringify(initialState)
      })
    })
})

module.exports = router
