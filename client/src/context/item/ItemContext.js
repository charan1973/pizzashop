import React, { createContext, useReducer } from 'react';
import itemReducer from './itemReducer';

export const ItemContext = createContext()

const ItemContextProvider = ({children}) => {
    const [item, itemDispatch] = useReducer(itemReducer, {
        showDrawer: false,
        cart: []
    })

    return (
        <ItemContext.Provider value={{item, itemDispatch}}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemContextProvider