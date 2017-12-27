import React from 'react'
import {render} from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import CesiumViewer from './cesiumComponent'
import LeftMenu from './components/leftMenu'
import Left from './containers/leftContainer'

import reducers from './reducers'

import './style/index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers,applyMiddleware(logger))

const style = {
    leftPaper : {
        display: 'inline-block',
        float: 'left',
        width: '3%',
        height: '100%'
    },
    rightPaper : {
        display: 'inline-block',
        float: 'left',
        height: '100%',
        width: '97%'
    },
}

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div id="cesium-container">
                <Paper style={style.leftPaper}>
                    {/* <LeftMenu></LeftMenu> */}
                    <Left></Left>
                </Paper>
                <Paper style={style.rightPaper}>
                    <CesiumViewer></CesiumViewer>
                </Paper>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
) 