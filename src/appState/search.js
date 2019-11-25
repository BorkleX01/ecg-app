export const filtered = 'FILTER'

export const applyFilter = ( params ) => dispatch => {
  dispatch({
    type: filtered,
    params
  })

}

export const entitiesF = (state = [''] , action) => {
  if ((action.type === 'FILTER')){
        let str = action.params[0]
        let list = action.params[1]
        let tst = (m) => {
            return m.startsWith(str)
        }

        state = list.filter(o => tst(o.surname))
        return state

    }
    if (action.type === 'CACHE_EDIT') {
      let idx = action.iObj.index
      let idxM = action.iObj.indexMasked
      state.map((o)=>{if (o.index === idx) {
        state[idxM] = {...state[idxM], ...action.iObj}}})
      return state 
    }
    
    return state
}
