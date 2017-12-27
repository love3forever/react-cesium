import Cesium from 'cesium/Cesium'

export const CESIUM_INIT_START = 'CESIUM_INIT_START'
export const CESIUM_INIT_CONFIG = 'CESIUM_INIT_CONFIG'
export const CESIUM_INIT_LAYER = 'CESIUM_INIT_LAYER'
export const CESIUM_INIT_TERRAIN = 'CESIUM_INIT_TERRAIN'
export const CESIUM_INIT_ENTITIES = 'CESIUM_INIT_ENTITIES'
export const CESIUM_INIT_COMPLETED = 'CESIUM_INIT_COMPLETED'

const bingKey = 'AnFQp5vgNIyQ1nLbp463VCuKs18gxbdjVaVNb2pdqiSpidyxLJzM-XmnM2qJ6Xqm'

const bing = new Cesium.BingMapsImageryProvider({
    url: 'https://dev.virtualearth.net', 
    key: bingKey, 
    mapStyle: Cesium.BingMapsStyle.AERIAL
});

const initConfig = {
    animation: false,
    timeline: false,
    navigationInstructionsInitiallyVisible: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    infoBox: false,
    selectionIndicator: false,
    clock: null,
    imageryProvider : bing
}

export const initCesiumStart = () => ({
    type:CESIUM_INIT_START,
    message:'Initialize start'
})

export const initCesiumConfig = (config = initConfig) => ({
    type:CESIUM_INIT_CONFIG,
    config
})

export const initCesiumLayer = (layerProvider=bing) => ({
    type:CESIUM_INIT_LAYER,
    layerProvider
})

export const initCesiumTerrain = () => ({
    type:CESIUM_INIT_TERRAIN
})

export const initCesiumComplete = (cesiumInstance) => ({
    type:CESIUM_INIT_COMPLETED,
    instance:cesiumInstance
})
