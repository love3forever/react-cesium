import React from 'react'
import {render} from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'

import CesiumViewer from './cesiumComponent'
import reducers from './reducers'

import './style/index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers,applyMiddleware(logger))

render(
    <Provider store={store}>
        <CesiumViewer/>
    </Provider>,
    document.getElementById('root')
) 