var express = require('express')
var router = express.Router()

import React from 'react'
import ReactDOM from 'react-dom/server'
import Home from '../app/scripts/containers/Home'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    html: ReactDOM.renderToString(<Home />)
  })
})

module.exports = router
