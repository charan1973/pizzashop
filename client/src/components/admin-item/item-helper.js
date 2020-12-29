import { API } from "../../backend";
import axios from "axios";

export const createItem = (item) => {
  return axios
    .post(`${API}/admin/item/create`, item)
    .catch((err) => console.log(err));
};


export const deleteItemCB = (itemId) => {
  return axios
    .delete(`${API}/admin/item/delete/${itemId}`)
    .catch((err) => console.log(err));
};
