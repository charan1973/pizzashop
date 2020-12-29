import axios from "axios";
import { API } from "../../backend";

export const createAddOn = (addOn) => {
    return axios.post(`${API}/admin/addon/create`, {...addOn})
            .catch(err => console.log(err))
};

export const getAllAddOn = () => {
    return axios.get(`${API}/addon/all`)
            .catch(err => console.log(err))
}

export const deleteAddOnCB = (addOnId) => {
    return axios.delete(`${API}/admin/addon/delete/${addOnId}`)
            .catch(err => console.log(err))
}

export const updateAddOnCB = (addOnId, addOnContent) => {
    return axios.put(`${API}/admin/addon/update/${addOnId}`, {...addOnContent})
            .catch(err => console.log(err))
}