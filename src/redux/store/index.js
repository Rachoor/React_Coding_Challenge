import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

let Middlewares = [thunk]
let store
if (process.env.prod === 'true') {
  store = createStore(rootReducer, compose(applyMiddleware(...Middlewares)))
} else {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...Middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}

export default store
