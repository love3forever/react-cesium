import React from 'react'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BaseViewer  from './components/base'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
// import rootReducer from './reducers/combianReducers'
import {initLayerContainerReducer} from './reducers/layerContainer'
import './style/index.css'

const store = createStore(initLayerContainerReducer, applyMiddleware(logger))

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <BaseViewer></BaseViewer>
        </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('root')
) 