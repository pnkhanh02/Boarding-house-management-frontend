import { api } from "./APIs"

export const getAllPhongsAPI = ()=>{
    return api("GET","phong/getAll",null)
};
export const getSearchPhongsAPI = (request)=>{
    return api("POST","phong/search",request)
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
export const getNumberOfPhong= ()=>{
    return api("GET","phong/size",null)
}