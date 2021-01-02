import React, { createContext, useEffect, useReducer } from 'react';
import { getUserRoleAction, logoutAction } from './user.actions';
import { getUserRole } from './user.utils';
import userReducer from './userReducer';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, userDispatch] = useReducer(userReducer, {}, () => {
        if(localStorage.getItem("user")){
            const localData = localStorage.getItem("user")
            return JSON.parse(localData)
        }else{
            return ""
        }
    })

    useEffect(() => {
        if(user.role === 0 || user.role === 1){
            getUserRole()
            .then(({data}) => {
                userDispatch(getUserRoleAction(data.role))
            })
        }else if(user.role === undefined){
            userDispatch(logoutAction())
        }
    }, [user.role])

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return ( 
        <UserContext.Provider value={{user, userDispatch}}>
            {children}
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;