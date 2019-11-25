export const editDocument = 'EDIT'

export const changeView = (viewName, obj)  => dispatch => {
    dispatch({
      type: 'VIEW',
      viewName
    })
}


export const view = (state = 'Overview', action) => {
    if (action.type === 'VIEW'){
      return  action.viewName
    }
  if (action.type === 'CACHE_EDIT'){
      return  'Detail'
    }
    return state
}



export const nav = (state = {nav : ['OVERVIEW']} , action) => {
    if (action.type === 'DATA_READY'){
        state = ['OVERVIEW']

    }
    if (action.type === 'DOCUMENT') {
        state.push('VIEW')

    }
    if (action.page === 'Edit') {
        state.push('EDIT')

    }

    if (action.page === 'Detail')
    {
        state = ['OVERVIEW', "VIEW"]
        return state
    }
    if (action.page === 'Overview'){
        return ['OVERVIEW']
    }
    
    return state
}

