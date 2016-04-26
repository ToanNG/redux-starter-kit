import express from 'express'
const router = express.Router()

import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import configureStore from '../shared/store/configureStore'
import { IntlProvider } from '../shared/lib/react-intl-redux'
import fetchComponentData from '../shared/lib/fetchComponentData'
import routes from './routes'

router.use((req, res, next) => {
  const store = configureStore()

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const InitialView = (
            <Provider store={store}>
              <IntlProvider>
                <RouterContext {...renderProps} />
              </IntlProvider>
            </Provider>
          )
          const initialState = store.getState()
          const html = renderProps.location.pathname !== '/shell'
            ? ReactDOM.renderToString(InitialView)
            : null

          res.render('index', {
            title: 'Express',
            state: JSON.stringify(initialState),
            html
          })
        })
        .catch((error) => {
          res.status(500).send(error.message)
        })
    } else {
      res.status(404).send('Not found')
    }
  })
})

export default router
