import { api } from "./APIs"

export const createDanhGiaAPI= (danhGia)=>{
    return api("POST","danhgia/create",danhGia)
}