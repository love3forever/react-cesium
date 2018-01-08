import {initLayerContainer,INIT_LAYERCONTAINER} from '../actions/layerContainer'

export const initLayerContainerReducer = (state={},action) => {
    switch (action.type) {
        case INIT_LAYERCONTAINER:
            return {
                ...state,
                layerContainer:action.layerContainer
            }
        default:
            return state
    }
}

