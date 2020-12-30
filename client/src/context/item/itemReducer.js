import { deleteItemFromCart, increaseDecreaseItemQuantity } from "./item.utils";
import {
  SHOW_DRAWER,
  CLOSE_DRAWER,
  ADD_TO_CART,
  DELETE_ITEM_FROM_CART,
  INCREASE_DECREASE_ITEM_QUANTITY,
  CLEAR_CART,
} from "./itemTypes";

const itemReducer = (state, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return {
        ...state,
        showDrawer: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        showDrawer: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case DELETE_ITEM_FROM_CART:
      return {
        ...state,
        cart: deleteItemFromCart(state.cart, action.payload),
      };
    case INCREASE_DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        cart: increaseDecreaseItemQuantity(
          state.cart,
          action.payload,
          action.quantityState
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      }

    default:
      return state;
  }
};

export default itemReducer;
