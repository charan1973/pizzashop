import React, { createContext, useEffect, useReducer } from "react";
import itemReducer from "./itemReducer";

export const ItemContext = createContext();

const ItemContextProvider = ({ children }) => {
  const [item, itemDispatch] = useReducer(itemReducer, {}, () => {
    return {
      showDrawer: false,
      cart: JSON.parse(localStorage.getItem("cart"))
        ? [...JSON.parse(localStorage.getItem("cart"))]
        : [],
    };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(item.cart));
  }, [item.cart]);

  return (
    <ItemContext.Provider value={{ item, itemDispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
