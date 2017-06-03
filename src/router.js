import React from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

export default function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          app.model(require('./models/lifegame'))
          cb(null, { component: require('./routes/lifegame/lifegame') })
        })
      },
      childRoutes: [
        {
          path: 'lifegame',
          name: 'lifegame',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              app.model(require('./models/lifegame'))
              cb(null, require('./routes/lifegame/lifegame'))
            })
          },
        },
        {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/error'))
            })
          },
        },
      ],
    },
  ]

  return (
    <Router history={history} routes={routes} />
  )
}
