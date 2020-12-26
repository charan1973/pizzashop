import axios from "axios"
import {API} from "../../backend"

export const getUserRole = () => {
    return axios.get(`${API}/user/get-role`)
            .catch(err => console.log(err))
}