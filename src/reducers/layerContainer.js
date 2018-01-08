import {INIT_LAYERPROVIDER} from '../actions/layerContainer'

export const initLayerContainerReducer = (state={},action) => {
    switch (action.type) {
        case INIT_LAYERPROVIDER:
            return {
                ...state,
                layerProviders:action.layerProviders
            }
        default:
            return state
    }
}

