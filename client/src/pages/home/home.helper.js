import axios from "axios"
import {API} from "../../backend"

export const getAllItems = () => {
    return axios.get(`${API}/item/all`)
            .catch(err => console.log(err))
}

export const getItem = (itemId) => {
    return axios.get(`${API}/item/${itemId}`)
            .catch(err => console.log(err))
}

export const getAllAddOn = () => {
    return axios.get(`${API}/addon/all`)
            .catch(err => console.log(err))
}