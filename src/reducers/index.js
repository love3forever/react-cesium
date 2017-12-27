import {combineReducers} from 'redux'
import {initCesiumReducer} from './cesium'

const reducers = combineReducers({
    cesium:initCesiumReducer
})

export default reducers 
