import axios from "axios"
import {API} from "../../backend"


export const addCategory = (categoryName) => {
    return axios.post(`${API}/admin/category/create`, {categoryName})
            .catch(err => console.log(err))
}

export const getAllCategory = () => {
    return axios.get(`${API}/category/all`)
            .catch(err => console.log(err))
}

export const deleteCategoryCB = (categoryId) => {
    return axios.delete(`${API}/admin/category/delete/${categoryId}`)
            .catch(err => console.log(err))
}
