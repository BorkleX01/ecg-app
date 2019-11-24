import merge from 'lodash/merge'
import { combineReducers } from 'redux'

const entities = (state = {entities : []} , action) => {
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

const masked = (state = [''] , action) => {

    if (action.type === 'FILTER') {
        console.log(action)
        let str = action.params[0]
        let list = action.params[1]
        let tst = (m) => {
            return m.startsWith(str)
        }

        state = list.filter(o => tst(o.surname))
        return state

    }
   
    return state
}

const page = (state = 'Overview', action) => {
    if (action.type === 'VIEW'){
        state = action.page
    }
    return state
}

const thisDoc = (state = {} , action) => {
    if (action.type === 'DOCUMENT'){
        state = action.obj
    }
    return state
}

const pagerNum = (state = 1, action) => {
    
}

const nav = (state = {nav : []} , action) => {
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

const modal = (state = {display: 'none', plotXY: false}, action) => {
    if (action.type === 'MODAL')
    {
        if (action.plotXY){
            return {display: 'inline', plotXY: action.plotXY}
        }else{
            return {display: 'none', plotXY: action.plotXY}
        }
    }
    return state
}

const rootReducer = combineReducers({
    entities,
    masked,
    page,
    thisDoc,
    nav,
    modal
})

export default rootReducer



