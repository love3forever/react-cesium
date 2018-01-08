import {INIT_LAYERPROVIDER,SELECT_LAYERPROVIDER,REMOVE_LAYERPROVIDER,REMOVE_LAYER,ADD_LAYER} from '../actions/layerContainer'

export const initLayerContainerReducer = (state={},action) => {
    switch (action.type) {
        case INIT_LAYERPROVIDER:
            return {
                ...state,
                layerProviders:action.layerProviders
            }
        case SELECT_LAYERPROVIDER:
            const newState = Object.assign({},state)
            const targetId = action.selected
            newState.layerProviders.forEach(element => {
                if (element.get('id')===targetId) {
                    element.set('selected',true)
                    return newState
                }
            })
            return newState
        case REMOVE_LAYERPROVIDER:
            const providerState = Object.assign({},state)
            const removeId = action.selected
            providerState.layerProviders.forEach(element => {
                if (element.get('id')===removeId) {
                    element.set('selected',false)
                    return providerState
                }
            })
            return providerState 
        case ADD_LAYER:
            const layerState = Object.assign({},state)
            const layers = layerState.layers || new Set()
            layers.add(action.layer)
            layerState.layers = layers
            return layerState
        case REMOVE_LAYER:
            const removeLayerState = Object.assign({},state)
            const removelayers = removeLayerState.layers
            removelayers.forEach(layer=>{
                if (layer.get('id')===action.selected) {
                    removelayers.delete(layer)
                    return removeLayerState
                }
            })
            return removeLayerState
        default:
            return state
    }
}

