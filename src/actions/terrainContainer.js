export const SELECTED_TERRAIN_CHANGED = 'SELECTED_TERRAIN_CHANGED'
export const selectedTerrainsChanged = (ids) => ({
    type: SELECTED_TERRAIN_CHANGED, 
    ids
})

export const ADD_TERRAIN_PROVIDER = 'ADD_TERRAIN_PROVIDER'
export const addTerrainProvider = (name) => ({
    type:ADD_TERRAIN_PROVIDER,
    name
})

export const REMOVE_TERRAIN_PROVIDER = 'REMOVE_TERRAIN_PROVIDER'
export const removeTerrainProvider = (name) => ({
    type:REMOVE_TERRAIN_PROVIDER,
    name
})