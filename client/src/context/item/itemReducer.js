import { SHOW_DRAWER, CLOSE_DRAWER } from './itemTypes';

const itemReducer = (state, action) => {
    switch(action.type){
        case SHOW_DRAWER:
            return {
                ...state,
                showDrawer: true
            }
        case CLOSE_DRAWER:
            return {
                ...state,
                showDrawer: false
            }
        default:
            return state
    }
}

export default itemReducer