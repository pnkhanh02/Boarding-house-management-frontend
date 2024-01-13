import { api } from "./APIs"

export const getAllHopDongAPI = ()=>{
    return api("GET","hopdong/getAll",null)
};
export const createHopDongAPI = (hopdong) => {
    return api("POST", "hopdong/create", hopdong);
};
export const deleteHopDongAPI = (id) => {
    return api("DELETE", `hopdong/${id}`, null);
};
export const editHopDongAPI = (hopdong) => {
    return api("PUT", `hopdong/update`, hopdong);
};