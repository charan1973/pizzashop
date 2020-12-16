import axios from "axios"
import {API} from "../../backend"

export const signUp = (cred) => {
    return axios.post(`${API}/signup`, {...cred})
            .catch(err => console.log(err))
}

export const signIn = (cred) => {
    return axios.post(`${API}/signin`, {...cred})
    .catch(err => console.log(err))
}

export const signOut = () => {
    return axios.post(`${API}/signout`)
            .catch(err => console.log(err))
}