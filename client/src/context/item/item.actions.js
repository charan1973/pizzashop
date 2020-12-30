import { ADD_TO_CART, CLEAR_CART, CLOSE_DRAWER, DELETE_ITEM_FROM_CART, INCREASE_DECREASE_ITEM_QUANTITY, SHOW_DRAWER } from "./itemTypes";

export const showCustomizeDrawer = () => ({
    type: SHOW_DRAWER
})

export const closeCustomizeDrawer = () => ({
    type: CLOSE_DRAWER
})

export const addToCartAction = (payload) => ({
    type: ADD_TO_CART,
    payload
})

export const deleteFromCartAction = (payload) => ({
    type: DELETE_ITEM_FROM_CART,
    payload
})

export const increaseDecreaseQuantityAction = (payload, quantityState) => ({
    type: INCREASE_DECREASE_ITEM_QUANTITY,
    payload,
    quantityState
})

export const clearCartAction = () => ({
    type: CLEAR_CART
})