import { api } from "./APIs"

export const getAllHopDongAPI = (request)=>{
    return api("POST","hopdong/search",request)
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
export const getNumberOfHopDong= ()=>{
    return api("GET","hopdong/size",null)
}