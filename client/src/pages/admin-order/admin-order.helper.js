import {API} from "../../backend"
import axios from "axios"

export const getAllOrders = () => {
    return axios.get(`${API}/admin/order/all`)
            .catch(err => console.log(err)) 
}