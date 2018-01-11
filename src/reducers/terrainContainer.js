import {SELECTED_TERRAIN_CHANGED} from '../actions/terrainContainer'

export const terrainContainerReducer = (state={},action) => {
    switch (action.type) {
        case SELECTED_TERRAIN_CHANGED:
            return {
                ...state,
                terrainSelected:action.ids
            }
        default:
            return state
    }
}