import { api } from "./APIs"

export const getAllBaoTriAPI = (request)=>{
    return api("POST","baotri/search",request)
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
export const getNumberOfBaoTri= ()=>{
    return api("GET","baotri/size",null)
}