import { api } from "./APIs"

export const getAllYeuCauAPI = ()=>{
    return api("GET","yeucau/getAll",null)
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