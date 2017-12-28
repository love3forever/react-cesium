import * as cesiumInit from '../actions/cesiumInit'

export const initCesiumReducer = (state={},action) => {
    switch (action.type) {
        case cesiumInit.CESIUM_INIT_START:
            return {
                ...state,
                message:action.message
            }
        case cesiumInit.CESIUM_INIT_CONFIG:
            return {
                ...state,
                config:action.config
            }
        case cesiumInit.CESIUM_INIT_LAYER:
            return {
                ...state,
                layerProvider:action.layerProvider
            }
        case cesiumInit.CESIUM_INIT_COMPLETED:
            return {
                ...state,
                instance:action.instance
            }
        default:
            return state
    }
}