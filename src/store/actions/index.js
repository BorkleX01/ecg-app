import db from '../api/db'
import * as types from '../constants/ActionTypes'

const cache = data => ({
  type: types.ready,
  data
})

export const getAllData = () => dispatch => {
  db.getData(data => {
    dispatch(cache(data))
  })
}

export const filteredData = ( params ) => dispatch => {
    dispatch({
        type: types.filtered,
        params
    })

}


export const changePage = page => dispatch => {
    dispatch({
        type: types.view,
        page
    })
}

export const editMode = page => dispatch => {
    dispatch({
        type: types.edit,
        page
    })
}

export const setCurrentDoc = obj => dispatch => {
    dispatch({
        type: types.currentDoc,
        obj
    })
}

export const alterCache = iObj => dispatch => {
    dispatch({
        type: types.cacheEdit,
        iObj
    })
}

export const turnOnModal = plotXY => dispatch => {
    dispatch({
        type: types.modal,
        plotXY
    })
}
