import { api } from "./APIs"

export const getAllTaiKhoanAPI = ()=>{
    return api("GET","taikhoan/getAll",null)
};
export const getSearchTaiKhoansAPI = (request)=>{
    return api("POST","taikhoan/search",request)
};
export const createTaiKhoanAPI = (taikhoan) => {
    return api("POST", "taikhoan/create", taikhoan);
};
export const deleteTaiKhoanAPI = (id) => {
    return api("DELETE", `taikhoan/${id}`, null);
};
export const editTaiKhoanAPI = (taikhoan) => {
    return api("PUT", `taikhoan/update`, taikhoan);
};
export const getNumberOfTaiKhoan= ()=>{
    return api("GET","taikhoan/size",null)
}