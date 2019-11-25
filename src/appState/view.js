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



export const nav = (state = ['OVERVIEW'] , action) => {
  if (action.type === 'VIEW'){
    
    if (action.viewName === 'Overview'){
      state = ['OVERVIEW']

    }

    if (action.viewName === 'Detail')
    {
      state = ['OVERVIEW','VIEW']

    }
    
    if (action.viewName === 'Edit') {
      state =['OVERVIEW','VIEW','EDIT']

    }
  }

  return state
}

