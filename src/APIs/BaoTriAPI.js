import { api } from "./APIs"

export const getAllBaoTriAPI = ()=>{
    return api("GET","baotri/getAll",null)
};
export const createBaoTriAPI = (baotri) => {
    return api("POST", "baotri/create", baotri);
};
export const deleteBaoTriAPI = (id) => {
    return api("DELETE", `baotri/${id}`, null);
};
export const editBaoTriAPI = (baotri) => {
    return api("PUT", `baotri/update`, baotri);
};