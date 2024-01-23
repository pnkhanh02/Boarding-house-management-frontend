import { api } from "./APIs"

export const createBinhLuanAPI= (binhluan)=>{
    return api("POST","binhluan/create",binhluan)
}