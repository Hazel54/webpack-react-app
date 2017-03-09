
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import browser from './utils/browser'

import * as reducers from './reducers'

import './asset/app.scss'

import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(browserHistory)
    )
  )
)

const history = syncHistoryWithStore(hashHistory, store)

if (!browser.android && !browser.iPhone && !browser.iPad) {
  const html = document.getElementsByTagName('html')[0]
  const runtime = document.getElementById('__runtime__')
  html.style.fontSize = '35px'
  runtime.style.width = '350px'
  runtime.style.left = '50%'
  runtime.style.borderLeft = '1px solid rgba(0,0,0,.2)'
  runtime.style.borderRight = '1px solid rgba(0,0,0,.2)'
  runtime.style.transform = 'translate(-50%,0)'
  runtime.style.webkitTransform = 'translate(-50%,0)'
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('__runtime__')
)
