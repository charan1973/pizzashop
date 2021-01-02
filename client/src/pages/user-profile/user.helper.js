import axios from "axios"
import {API} from "../../backend"

export const getUserData = (userId) => {
    return axios.get(`${API}/user/profile`)
            .catch(err => console.log(err))
}

export const getUserOrders = (page) => {
    return axios.get(`${API}/user/order/all/?page=${page}`)
            .catch(err => console.log(err)) 
}

export const addressWrite = (address) => {
    // const {buildingNumber, streetName, area, city, zipcode, phoneNumber} = address
    if(address.type === "Create"){
        return axios.post(`${API}/user/address/add`, {address})
                .catch(err => console.log(err))
    }else if(address.type === "Update"){
        return axios.put(`${API}/user/address/edit`, {...address})
            .catch(err => console.log(err))
    }
}

export const deleteAddress = (addressId) => {
    return axios.delete(`${API}/user/address/delete/${addressId}`)
            .catch(err => console.log(err))
}