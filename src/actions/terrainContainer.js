export const INIT_TERRAIN_CONTAINER = 'INIT_TERRAIN_CONTAINER'
export const initTerrainContainer = (terrainProviders) => ({
    type:INIT_TERRAIN_CONTAINER,
    terrainProviders
})

export const ADD_TERRAIN_LAYER = 'ADD_TERRAIN_LAYER'
export const addTerrainLayer = (id) => ({
    type:ADD_TERRAIN_LAYER,
    selected:id
})

export const REMOVE_TERRAIN_LAYER = 'REMOVE_TERRAIN_LAYER'
export const removeTerrainLayer = (id) => ({
    type:REMOVE_TERRAIN_LAYER,
    selected:id
})