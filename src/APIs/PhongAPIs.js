import { api } from "./APIs"

export const getAllPhongsAPI = ()=>{
    return api("GET","phong/getAll",null)
}