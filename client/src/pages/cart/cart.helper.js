import {API} from "../../backend"
import axios from "axios"

export const placeOrder = (orderState, token) => {
    return axios.post(`${API}/user/order/create`, {...orderState, token})
            .catch(err => console.log(err))
}

export const calculateTotal = (cart) => {
    return cart.reduce(
      (a, item) =>
        a +
        (item.itemPrice +
          item.addOn.reduce((b, addOn) => b + addOn.addOnPrice, 0)) *
          item.quantity,
      0
    );
  };