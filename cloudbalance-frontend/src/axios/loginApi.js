import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

export const loginApi = axios.create({
    baseURL: `${backendUrl}`, 
    timeout: 3000,
    withCredentials: true 
})