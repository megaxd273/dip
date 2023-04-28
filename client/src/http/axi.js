import axios from "axios";

export const API_URL = `http://localhost:3000`

const $axi = axios.create({
    withCredentials:true,
    baseURL: API_URL
})

$axi.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default $axi;