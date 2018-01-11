import {combineReducers} from 'redux'

import {initLayerContainerReducer} from './layerContainer'
import {terrainContainerReducer} from './terrainContainer'


export default combineReducers({
    imageLayer:initLayerContainerReducer,
    terrainLayer:terrainContainerReducer
})