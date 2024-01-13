import { api } from "./APIs"

export const getAllPhongsAPI = ()=>{
    return api("GET","phong/getAll",null)
};
export const createPhongsAPI = (phong) => {
    return api("POST", "phong/create", phong);
};
export const deletePhongAPI = (id) => {
    return api("DELETE", `phong/${id}`, null);
};
export const editPhongAPI = (phong) => {
    return api("PUT", `phong/update`, phong);
};