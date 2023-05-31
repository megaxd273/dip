import axios from "axios";

export const API_URL = `http://localhost:3000`

const $axi = axios.create({
    withCredentials:true,
    baseURL: API_URL
})

$axi.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})
$axi.interceptors.response.use(config=> config, 
    async (error)=>{
        const originalRequest = error.config;
        if(error.response.status == 401 && error.config && !error.config._isRetry){
            originalRequest._isRetry = true;
            try {
                const response = await axios.get("http://localhost:3000/api/auth/refresh", {withCredentials:true})
                localStorage.setItem('accessToken',response.data.accessToken)
                return $axi.request(originalRequest)
            } catch (error) {
                console.log('not authorized')
            }
        }
        throw error;
})

export default $axi;