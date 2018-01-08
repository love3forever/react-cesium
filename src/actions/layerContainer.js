export const INIT_LAYERPROVIDER = 'INIT_LAYERPROVIDER'
export const initLayerProviderAction = (layerProviders) => (
    {
        type:INIT_LAYERPROVIDER,
        layerProviders
    }
)

export const SELECT_LAYERPROVIDER = 'SELECT_LAYERPROVIDER'
export const selectLayerProvider = (id) => ({
    type:SELECT_LAYERPROVIDER,
    selected:id
})

export const REMOVE_LAYERPROVIDER = 'REMOVE_LAYERPROVIDER'
export const removeLayerProvider = (id) => ({
    type:REMOVE_LAYERPROVIDER,
    selected:id
})

export const ADD_LAYER = 'ADD_LAYER'
export const addLayer = (layer) => ({
    type:ADD_LAYER,
    layer
})

export const REMOVE_LAYER = 'REMOVE_LAYER'
export const removeLayer = (id) => ({
    type:REMOVE_LAYER,
    selected:id
})