export const SELECTED_IMAGERYS_CHANGED = 'SELECTED_IMAGERYS_CHANGED'
export const selectedImagerysChanged = (ids) =>({
    type:SELECTED_IMAGERYS_CHANGED,
    ids
})

export const ADD_IMAGERYPROVIDER = 'ADD_IMAGERYPROVIDER'
export const addImageryProvider = (name) => ({
    type:ADD_IMAGERYPROVIDER,
    name
})

export const REMOVE_IMAGERYPROVIDER = 'REMOVE_IMAGERYPROVIDER'
export const removeImageryProvider = (name) => ({
    type:REMOVE_IMAGERYPROVIDER,
    name
})