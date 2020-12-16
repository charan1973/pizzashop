import {API} from "../../backend"
import axios from "axios"

export const createItem = (item) => {
    return axios.post(`${API}/admin/item/create`, {...item})
            .catch(err => console.log(err))
}

export const getAllItems = () => {
    return axios.get(`${API}/item/all`)
            .catch(err => console.log(err))
}