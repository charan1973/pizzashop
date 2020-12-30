import {API} from "../../backend"
import axios from "axios"

export const placeOrder = (orderState) => {
    return axios.post(`${API}/user/order/create`, {...orderState})
            .catch(err => console.log(err))
}