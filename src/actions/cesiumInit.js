import Cesium from 'cesium/Cesium'
import deepcopy from 'deepcopy'
import * as _ from 'lodash'

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


const pointEntity = {
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW
    }
}

export const CESIUM_ADD_ENTITY = 'CESIUM_ADD_ENTITY'
export const CESIUM_ADD_ENTITY_COMPLETE = 'CESIUM_ADD_ENTITY_COMPLETE'

const addEntityToCesiumComplete = (viewer) => ({
    type:CESIUM_ADD_ENTITY_COMPLETE,
    viewer
})

export const addEntityToCesium = (state,entity=pointEntity) => dispatch => {
    // let viewer = _.cloneDeep(state.instance)
    let viewer = state.instance
    if (viewer) {
        viewer.entities.add(entity)
    }
    dispatch(addEntityToCesiumComplete(viewer))
}