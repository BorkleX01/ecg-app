export const setCurrentDoc = obj => dispatch => {
    dispatch({
        type: "DOCUMENT",
        obj
    })
}

export const alterCache = iObj => dispatch => {
  dispatch({
    type: "CACHE_EDIT",
    iObj
  })
}


export const thisDoc = (state = {} , action) => {
    if (action.type === 'DOCUMENT'){
        state = action.obj
    }
    return state
}


