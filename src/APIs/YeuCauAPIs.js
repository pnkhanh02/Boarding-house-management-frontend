import { api } from "./APIs"

export const getAllYeuCauAPI = (request)=>{
    return api("POST","yeucau/search",request)
};
export const createYeuCauAPI = (yeucau) => {
    return api("POST", "yeucau/create", yeucau);
};
export const deleteYeuCauAPI = (id) => {
    return api("DELETE", `yeucau/${id}`, null);
};
export const editYeuCauAPI = (yeucau) => {
    return api("PUT", `yeucau/update`, yeucau);
};
export const getNumberOfYeuCau= ()=>{
    return api("GET","yeucau/size",null)
}