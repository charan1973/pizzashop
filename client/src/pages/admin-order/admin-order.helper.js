import {API} from "../../backend"
import axios from "axios"

export const getAllOrders = () => {
    return axios.get(`${API}/admin/order/all`)
            .catch(err => console.log(err)) 
}

export const updateOrderStatus = (orderId, status) => {
    return axios.put(`${API}/admin/order/status/update`, {orderId, status})
            .catch(err => console.log(err))
}