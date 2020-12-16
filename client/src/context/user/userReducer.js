const { LOGIN_USER, LOGOUT_USER } = require("./userTypes");

const userReducer = (state, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...action.user
            }
        case LOGOUT_USER:
            return ""

        default: 
        return state
    }
}

export default userReducer