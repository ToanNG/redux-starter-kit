var express = require('express')
var router = express.Router()

import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import Home from 'shared/containers/Home'
import configureStore from 'shared/store/configureStore'

/* GET home page. */
router.get('/', function (req, res, next) {
  const store = configureStore()
  const InitialView = (
    <Provider store={store}>
      <Home />
    </Provider>
  )

  res.render('index', {
    title: 'Express',
    html: ReactDOM.renderToString(InitialView)
  })
})

module.exports = router
