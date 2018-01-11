import {INIT_LAYERPROVIDER,SELECT_LAYERPROVIDER,REMOVE_LAYERPROVIDER,REMOVE_LAYER,ADD_LAYER} from '../actions/layerContainer'
import {SELECTED_IMAGERYS_CHANGED} from '../actions/layerContainer'
import * as _ from 'lodash'

export const initLayerContainerReducer = (state={},action) => {
    switch (action.type) {
        case SELECTED_IMAGERYS_CHANGED:
            return {
                ...state,
                imagerySelected:action.ids
            }
        default:
            return state
    }
}

