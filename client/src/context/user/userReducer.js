import { LOGIN_USER, LOGOUT_USER, GET_USER_ROLE } from "./userTypes";

const userReducer = (state, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...action.payload
            }
        case LOGOUT_USER:
            return ""
        case GET_USER_ROLE:
            return {
                ...state,
                role: action.payload
            }
        default: 
        return state
    }
}

export default userReducer