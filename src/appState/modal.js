export const modalTrigger = 'MODAL'

export const toggleModal = plotXY => dispatch => {
    dispatch({
        type: modalTrigger,
        plotXY
    })
}


export const modal = (state = {display: 'none', plotXY: false}, action) => {
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
