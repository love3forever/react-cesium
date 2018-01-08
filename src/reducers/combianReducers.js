import {combineReducers} from 'redux'

import {initLayerContainerReducer} from './layerContainer'

const rootReducer = combineReducers({
    layerContainer:initLayerContainerReducer
})

export default rootReducer