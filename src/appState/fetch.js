import merge from 'lodash/merge'
import response from '../resources/data.json'
export const ready = 'DATA_READY'

const db = {
    getData: (action) => action(response)
}

export const cache = data => ({
  type: ready,
  data
})

export const fetch = () => dispatch => {
  db.getData(data => {
    dispatch(cache(data))
  })
}


export const entities = (state = {entities : []} , action) => {
  if (action.type === 'DATA_READY') {
    return merge([], state.entities, action.data)
  }
  if (action.type === 'CACHE_EDIT') {
    const idx = action.iObj.index
    state[idx] = {...state[idx], ...action.iObj}
    return state 
  } 
  
  return state
}
