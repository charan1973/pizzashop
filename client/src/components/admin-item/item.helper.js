import { API } from "../../backend";
import axios from "axios";

export const createOrUpdateItem = (item, formType) => {
  if(formType === "create"){
    return axios
      .post(`${API}/admin/item/create`, item)
      .catch((err) => console.log(err));
  }else if(formType === "update"){
    return axios.put(`${API}/admin/item/update/${item.itemId}`, item)
            .catch(err => console.log(err))
  }
};

export const deleteItemCB = (itemId) => {
  return axios
    .delete(`${API}/admin/item/delete/${itemId}`)
    .catch((err) => console.log(err));
};
