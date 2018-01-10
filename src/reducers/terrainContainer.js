import {INIT_TERRAIN_CONTAINER,ADD_TERRAIN_LAYER,REMOVE_TERRAIN_LAYER} from '../actions/terrainContainer'

export const terrainContainerReducer = (state={},action) => {
    switch (action.type) {
        case INIT_TERRAIN_CONTAINER:
            return {
                ...state,
                terrainProviders:action.terrainProviders
            }
        case ADD_TERRAIN_LAYER:
            const newState = Object.assign({},state)
            const targetId = action.selected
            newState.terrainProviders.forEach(element => {
                if (element.get('id')===targetId) {
                    element.set('selected',true)
                    return newState
                }
            })
            return newState
        case REMOVE_TERRAIN_LAYER:
            const providerState = Object.assign({},state)
            const removeId = action.selected
            providerState.terrainProviders.forEach(element => {
                if (element.get('id')===removeId) {
                    element.set('selected',false)
                    return providerState
                }
            })
            return providerState 
        default:
            return state
    }
}