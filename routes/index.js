var express = require('express')
var router = express.Router()

import React from 'react'
import ReactDOM from 'react-dom/server'
import List from '../public/javascripts/components/List'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    html: ReactDOM.renderToString(<List />)
  })
})

module.exports = router
