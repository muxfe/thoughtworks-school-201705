import React, { PropTypes } from 'react'
import { connect } from 'dva'
import LifeGame from './lifegame/lifegame'

function App ({ children, location, dispatch, app }) {
  return (
    <LifeGame />
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(App)